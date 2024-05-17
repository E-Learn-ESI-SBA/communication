import { IsEmail, IsNotEmpty, IsIn } from 'class-validator'

const roles = ['admin', 'teacher', 'student'] as const;
export class UserClaims {
    avatar: string;
    
    email: string;
    
    exp: number;
    
    id: string;
    
    @IsIn(roles)
    role: "admin" | "student" | "teacher";
    
    username: string;
    
    group: string;
    
    year: string;

}
