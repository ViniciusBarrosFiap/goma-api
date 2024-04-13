//DTO dedicate to show a infos of user
export class UserListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly cpf: string,
  ) {}
}
