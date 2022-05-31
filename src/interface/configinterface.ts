export interface NFTMuseum {
    pisos: Piso[];
}

export interface Piso {
    id:        number;
    nftframes: Nftframe[];
}

export interface Nftframe {
    id:number;
    url: string;
}