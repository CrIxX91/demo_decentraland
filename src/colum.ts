import { Nftframe } from './interface/configinterface';

let id = 1;

function GetUVNFT(plane:PlaneShape, currSpriteCel:number) {
    let spriteCols = 4
    let spriteRows = 4
    let colFactor = 1 / spriteCols
    let rowFactor = 1 / spriteRows

    
    let currRowStart = spriteRows - Math.floor((currSpriteCel - 1) / spriteCols)
    let currColStart = ((currSpriteCel - 1) % spriteCols)

    plane.uvs = [

        (currColStart + 1) * colFactor, (currRowStart - 1) * rowFactor,
        currColStart * colFactor, (currRowStart - 1) * rowFactor,

        currColStart * colFactor, currRowStart * rowFactor,
        (currColStart + 1) * colFactor, currRowStart * rowFactor,

        (currColStart + 1) * colFactor, (currRowStart - 1) * rowFactor,
        currColStart * colFactor, (currRowStart - 1) * rowFactor,

        currColStart * colFactor, currRowStart * rowFactor,
        (currColStart + 1) * colFactor, currRowStart * rowFactor
    ]
}

function DrawNFT(parent:Entity, material:Material, num:number,nftlist:Nftframe[]) {
    let pos = new Vector3(1.01, 2, 0)
    let rot = Quaternion.Euler(0, 90, 0);
    let url = nftlist[id-1].url;

    switch (num + 1) {
        case 3:
            pos = new Vector3(1.01, 2, 0);
            rot = Quaternion.Euler(0, 270, 0);
            break;
        case 1:
            pos = new Vector3(-1.01, 2, 0)
            rot = Quaternion.Euler(0, 90, 0);
            break;
        case 4:
            pos = new Vector3(0, 2, 1.01);
            rot = Quaternion.Euler(0, 180, 0);
            break;
        case 2:
            pos = new Vector3(0, 2, -1.01);
            rot = Quaternion.Euler(0, 0, 0);
            break;

        default:
            break;
    }
    const nft01 = new Entity()
    const plane = new PlaneShape()
    nft01.addComponent(plane)
    GetUVNFT(plane, id)

    nft01.addComponent(new Transform({
        position: pos,
        rotation: rot,
        scale: new Vector3(1.7, 1.7, 1)
    }))
    engine.addEntity(nft01)
    nft01.addComponent(material)
    nft01.setParent(parent)
    
    nft01.addComponent(
        new OnPointerDown((e) => {
            openExternalURL(url)
        })
    )
    id++;
    if (id > 16) {
        id = 1;
    }
}


export function CreateColum(position:Vector3, atlasmaterial:Material,nftlink:Nftframe[]) {

    const simplenft = new Entity();
    const gltfShape = new GLTFShape("Models/ColumnaPrefab.glb")
    simplenft.addComponent(new Transform({ position }))

    gltfShape.withCollisions = true
    gltfShape.isPointerBlocker = false
    gltfShape.visible = true

    simplenft.addComponentOrReplace(gltfShape)

    engine.addEntity(simplenft)

    for (var _i = 0; _i < 4; _i++) {
        DrawNFT(simplenft, atlasmaterial, _i,nftlink)
    }
    return simplenft
}