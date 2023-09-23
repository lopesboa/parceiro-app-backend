import {
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import {
  LocalAuthGuard,
  AccessTokenGuard,
  RefreshTokenGuard,
} from '../../application/guards';
import { LoginService } from '../../application/types';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('LoginService') private readonly loginService: LoginService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.loginService.login(req.user);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  async logout(@Request() req) {
    console.log(req.user);
    // this.authenticationService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    console.log(refreshToken, userId);
    // return this.authenticationService.refreshTokens(userId, refreshToken);
  }
}
