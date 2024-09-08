export class ValidaEmail {

    static validarEmail(usuario: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(usuario);
    }
}
