interface userBuilder {
    reset(): void;
    setUsername(username: string): void;
    setEmail(email:string): void;
    setSenha(senha: string): void;
    setTelefone(telefone: string): void;
}

export default userBuilder;