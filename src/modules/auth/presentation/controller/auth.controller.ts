import {
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LogOutService, LoginService } from '../../application/types';
import { AccessTokenGuard, LocalAuthGuard, RefreshTokenGuard } from '../guards';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('LoginService') private readonly loginService: LoginService,
    @Inject('LogOutService') private readonly logOutService: LogOutService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.loginService.login(req.user);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  async logout(@Request() req) {
    await this.logOutService.logout(req.user['userId']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    console.log(refreshToken, userId, req.user);
    // return this.authenticationService.refreshTokens(userId, refreshToken);
  }
}
