import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthService } from 'src/user/service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is required.')
    }

    const token = authHeader.split(' ')[1]

    try {
      const user = await this.authService.validateToken(token)
      req['user'] = user
      return true
    } catch {
      throw new UnauthorizedException('Invalid token.')
    }
  }
}
