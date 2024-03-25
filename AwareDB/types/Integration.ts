export interface BasicIntegration{
    id: number
}

export interface Integration extends BasicIntegration{
    idUser: number;
    idPost: number;
}
