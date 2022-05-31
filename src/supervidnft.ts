import * as utils from '@dcl/ecs-scene-utils'

export function CreateSuperNFTVid(position : Vector3,rotation: Quaternion,pathvid: string,thumpath:string,url:string){

    /* Formas*/
    const nftvideo = new Entity();
    const gltfShape = new GLTFShape("models/marco.glb");
    const videoplane = new PlaneShape();
    const thumbplane = new PlaneShape();

    /*Material para el thumb */
    const thumbsTex = new Texture(thumpath)
    const thumbMaterial = new Material()
    thumbMaterial.albedoTexture = thumbsTex

    /*Material para el video */
    const videoClip = new VideoClip(pathvid);
    const videoTexture = new VideoTexture(videoClip);
    const vidMaterial = new Material();
    videoTexture.loop = true;
    vidMaterial.albedoTexture = videoTexture;
    vidMaterial.roughness = 1

    

    nftvideo.addComponent(new Transform({
        position: position,
        rotation: rotation,
        scale: new Vector3(1, 1, 1) 
        }))

    gltfShape.withCollisions = true
    gltfShape.isPointerBlocker = false
    gltfShape.visible = true
    nftvideo.addComponentOrReplace(gltfShape)
    
    engine.addEntity(nftvideo)
        
    const videntity = new Entity()
    videntity.addComponent(videoplane)
    videntity.addComponent(new Transform({
        position: new Vector3(0.1, 2, 0),
        rotation: Quaternion.Euler(0,90,0),
        scale: new Vector3(1.7,1.7,1.7)
    }))

    videntity.addComponent(vidMaterial)
    
    engine.addEntity(videntity)
    
    videntity.setParent(nftvideo)

    videntity.getComponent(PlaneShape).visible = false;
    
    

    const thumbentity = new Entity()
    thumbentity.addComponent(thumbplane)
    thumbentity.addComponent(new Transform({
        position: new Vector3(0.1, 2, 0),
        rotation: Quaternion.Euler(0,90,0),
        scale: new Vector3(1.7,-1.7,1.7)
    }))
    thumbentity.addComponent(thumbMaterial)
    engine.addEntity(thumbentity)
    
    thumbentity.setParent(nftvideo)

    thumbentity.getComponent(PlaneShape).visible = true

    videntity.addComponent(
        new OnPointerDown((e) => {
            openExternalURL(url)
        })
        )
    const box = new Entity()
    box.setParent(nftvideo)
    box.addComponent(new BoxShape())
    box.getComponent(BoxShape).withCollisions = false;
    
    box.addComponent(new Transform({
        position: new Vector3(2, 3, 0),
        scale: new Vector3(5,6,5)
    }))

    // let triggerBox = new utils.TriggerBoxShape(new Vector3(5,6,5), new Vector3(2, 3, 2));
    let triggerBox = new utils.TriggerBoxShape();
    log(rotation.eulerAngles.y );
    
    if(rotation.eulerAngles.y > 89.90 && rotation.eulerAngles.y < 90.1){
            triggerBox = new utils.TriggerBoxShape(new Vector3(5,6,5), new Vector3(2, 3, 2))
    }


    if(rotation.eulerAngles.y == 270){
        triggerBox = new utils.TriggerBoxShape(new Vector3(5,6,5), new Vector3(0, 0, 0))
    }
    
    box.addComponent(
    new utils.TriggerComponent(
        triggerBox,
        {
        onCameraEnter : () => {
        videntity.addComponentOrReplace(vidMaterial)
        videoTexture.reset();
        videoTexture.play();
        videoTexture.playing = true

        videntity.getComponent(PlaneShape).visible = true
        thumbentity.getComponent(PlaneShape).visible = false
        thumbplane.isPointerBlocker=false
        },
        onCameraExit: () => {
            videoTexture.reset();
            videoTexture.playing = false

            videntity.getComponent(PlaneShape).visible = false
            thumbentity.getComponent(PlaneShape).visible = true

            thumbplane.isPointerBlocker=true
        }
        }
    )
    )

    box.getComponent(BoxShape).visible = false
    return nftvideo;
}

