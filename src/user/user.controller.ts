import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserInfoDto } from './dto/user-info.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 200, type: UserInfoDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserInfo(@Req() req) {
    return req.user;
  }
}
// export interface AccessTokenInfo {
//   accessToken: string;
//   expiresIn: number;
//   getTime: number;
//   openid: string;
// }
//
// export interface AccessConfig {
//   access_token: string;
//   refresh_token: string;
//   openid: string;
//   scope: string;
//   unionid?: string;
//   expires_in: number;
// }
//
// export interface WechatError {
//   errcode: number;
//   errmsg: string;
// }
//
// export interface WechatUserInfo {
//   openid: string;
//   nickname: string;
//   sex: number;
//   language: string;
//   city: string;
//   province: string;
//   country: string;
//   headimgurl: string;
//   privilege: string[];
//   unionid: string;
// }
