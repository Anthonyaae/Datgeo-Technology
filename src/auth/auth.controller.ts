import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { redirect } from 'next/dist/server/api-utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData) {
    return this.authService.register(userData);
  }

  @Post('login')
async login(@Body() loginDto: { email: string; password: string }) {
  const user = await this.authService.validateUser(loginDto.email, loginDto.password);
  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  console.log("Usuario autenticado:", user.email, "Rol:", user.role, "ID:", user.id);

  const token = this.authService.generateJwt(user);
  return { 
    token, 
    id: user.id,  // <-- Agregamos el id del usuario
    redirect: user.role === "RH" ? `/employees?id=${user.id}` : `/profile?id=${user.id}` 
  };
}

}
