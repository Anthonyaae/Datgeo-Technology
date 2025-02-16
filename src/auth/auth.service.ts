import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly employeesService: EmployeesService,

  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const role = user.employee?.job_title || 'RH';

    return { id: user.id, email: user.email, role };
  }

  generateJwt(user: { id: number; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
  async register(userData: { first_name: string; last_name: string; email: string; password: string; job_title: string; salary: number; documents: string }) {
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new UnauthorizedException('El correo ya está registrado');
    }
  
    // 🔹 Hash de la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(userData.password, 10);
  
    // 🔹 Crear usuario primero
    const user = await this.usersService.create({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: hashedPassword,
    });
  
    // 🔹 Crear empleado con el usuario recién creado
    const employee = await this.employeesService.create({
      job_title: userData.job_title,
      salary: userData.salary,
      documents: userData.documents,
      user, // 🔹 Aquí ya tenemos el usuario, por lo que no debería fallar
    });
  
    return { message: 'Usuario registrado exitosamente', user, employee };
  }

}
