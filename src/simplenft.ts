import { Nftframe } from "./interface/configinterface";

let id = 1;

function GetUV(plane:PlaneShape, currSpriteCel:number) {
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

function DrawPicNFT(parent:Entity,material:Material,nftlist:Nftframe[]) {

    let pos = new Vector3(0.1, 2, 0)
    let rot = Quaternion.Euler(0, 90, 0);
    let url = nftlist[id-1].url;

    const nft01 = new Entity()
    const plane = new PlaneShape()
    nft01.addComponent(plane)
    
    GetUV(plane, id);

    nft01.addComponent(new Transform({
                position: pos,
                rotation: rot,
                scale: new Vector3(-1.7, 1.7, 1)
            }))
    engine.addEntity(nft01);
    nft01.addComponent(material);
    nft01.setParent(parent);
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

export function CreateNFTFrame(pos:Vector3, rot: Quaternion, atlasmaterial:Material,nftlink:Nftframe[]) {

    const simplenft = new Entity();
    const gltfShape = new GLTFShape("Models/marco.glb")
    simplenft.addComponent(new Transform({ 
        position: pos,
        rotation: rot 
    }))

    gltfShape.withCollisions = true
    gltfShape.isPointerBlocker = false
    gltfShape.visible = true

    simplenft.addComponentOrReplace(gltfShape);

    engine.addEntity(simplenft);

    DrawPicNFT(simplenft, atlasmaterial,nftlink);

    return simplenft;
}