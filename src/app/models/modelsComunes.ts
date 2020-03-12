export class CategoriaList {
    success: boolean;
    msg: Array<Categoria>;
}
export class Categoria {
    nombre: string;
    id: number;
    activo: string;
}


export class ComunList {
    success: boolean;
    msg: Array<Comun>;
}
export class Comun {
    nombre: string;
    id: number;
}

export class UsuarioList {
    success: boolean;
    msg: Array<Usuario>;
}

export class Usuario {
    id: number;
    nombre: string;
    usuario: string;
    mail: string;
    telefono: string;
    tipo: string;
    admin: string;
    activo: string;
}


export class NovedadesList {
    success: boolean;
    msg: Array<Novedades>;
}

export class Novedades {
    id: number;
    titulo: string;
    fecha: string;
    cuerpo: string;
    fechaDate: Date;
}

export class DesignacionesList {
    success: boolean;
    msg: Array<Designaciones>;
}
export class Designaciones {
    id: number;
    equipoA: string;
    equipoAId: number;
    equipoB: string;
    equipoBId: number;
    anotador: string;
    anotadorId: number;
    cronometro: string;
    cronometroId: number;
    arbitro1: string;
    arbitro1Id: number;
    arbitro2: string;
    arbitro2Id: number;
    arbitro3: string;
    arbitro3Id: number;
    categoria: string;
    categoriaId: number;
    cancha: string;
    canchaId: number;
    fecha: string;
    hora: number;
    anotador_confirmado: boolean;
    cronometro_confirmado: boolean;
    arbitro1_confirmado: boolean;
    arbitro2_confirmado: boolean;
    arbitro3_confirmado: boolean;
    resultadoA: number;
    resultadoB: number;
    cuarto: string;

}

export class CanchaPost {
    Can_Id: number;
    Can_Nom: string;
}

export class EquipoPost {
    Equ_Id: number;
    Equ_Nom: string;
}

export class CategoriaPost {
    Cate_Id: number;
    Cate_Nomb: string;
}

export class UsuarioPost {
    Usu_Id: number;
    Usu_NomApe: string;
    Usu_Tel: string;
    Usu_Mail: string;
    Usu_Tipo: string;
    Usu_EsAdmin: boolean;
    Usu_NomUsu: string;
    Usu_Pass: string;
    Usu_Activo: boolean;

}

export class UsuarioLoginPost {
    success: boolean;
    msg: {
        usuarioId: string;
        nombre: string;
        admin: boolean;
    };
}

export class NovedadesPost {
    Nove_Id: number;
    Nove_Titulo: string;
    Nove_Fecha: string;
    Nove_Cuerpo: string;
}

export class DesignacionesPost {
    Des_Id: number;
    Can_Id: number;
    Usu_Id: number;
    Cate_Id: number;
    Equ_A_Id: number;
    Equ_B_Id: number;
    Des_FechaHora: number;
    Usu_Arb1_Id: number;
    Usu_Arb2_Id: number;
    Usu_Arb3_Id: number;
    Usu_Anot_Id: number;
    Usu_Crono_Id: number;
    Des_Res_Eq_A: number;
    Des_Res_Eq_B: number;
    Des_Res_Cuarto: string;
}

export class DesignacionesScore {
    Des_Id: number;
    Des_Res_Eq_A: number;
    Des_Res_Eq_B: number;
}
export class DesignacionesConfirmar {
    designacionId: number;
    usuarioId: number;
}
export class ComunListPosiciones {
    success: boolean;
    msg: Array<Posiciones>;
}
export class Posiciones {
    Pos_Id: number;
    Cate_Id: string;
    Equ_Id: number;
    Pos_Ptos: number;
    Pos_Gan: number;
    Pos_Per: number;
    Pos_Jug: number;
}
