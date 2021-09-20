import { Timestamp } from "rxjs-compat";

export class Token {
    
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    static Remove(): void {
        window.localStorage.removeItem("ecommerce-user-id-token");
    }

    static Create(): Token {
        var token = window.localStorage["ecommerce-user-id-token"];
        console.log("Token: ", token);
        
        return new Token(token);
    }

    static Create2(token: string): Token {
        return new Token(token);
    }

    Parse(): Identity {
        let identity = JSON.parse(window.atob(this.token.split('.')[1])) as Identity;
        identity.token = this.token;
        return identity;
    }

    IsValid(): boolean {
        if (!this.token) return false;
        let payload = this.Parse()
        if (!payload) return false;
        return (payload.exp > Date.now() / 1000);
    }

    Save(): void {
        window.localStorage["ecommerce-user-id-token"] = this.token;
    }
}


export class Identity {
    sub: string;
    role: string;
    exp: number;
    token: string;
  }
