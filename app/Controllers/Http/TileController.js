'use strict'
const Tile = use('App/Models/Tile')
const Database = use('Database')
const Env = use('Env')

class TileController {

    async saveTile({auth, request}){

        const {name, imageId, walkSpeed, swimSpeed, flySpeed, passable, blocksSight} = request.post()

          const tile = new Tile

          tile.name = auth.user.username+ '_' + name
          tile.image_id = imageId
          tile.user_id = auth.user.id
          tile.swim_speed = swimSpeed
          tile.walk_speed = walkSpeed
          tile.fly_speed = flySpeed
          tile.passable = passable
          tile.blocks_sight = blocksSight

          if(Database.table('tiles').where('name', auth.user.username+ '_' + name)){
              const affectedRows = await Database
                .table('tiles')
                .where('name', auth.user.username+ '_' + name)
                .update('image_id', tile.image_id)
                .update('swim_speed', tile.swim_speed)
                .update('walk_speed', tile.walk_speed)
                .update('fly_speed', tile.fly_speed)
                .update('passable', tile.passable)
                .update('blocks_sight', tile.blocks_sight)
          }else{
              try{
                  await tile.save()
              }catch(e){
                  return e.message
              }
          }

          return 'saved'
    }

    async loadTile({auth, request}){

        var tiles = await Database
            .table('tiles')
            .innerJoin('images', 'tiles.image_id', 'images.id')

        tiles = tiles.map((el)=>{
            el.url = 'https://'+Env.get('S3_BUCKET')+'.s3-'+Env.get('S3_REGION')+'.'+'amazonaws.com/'+el.filename
            return el
        })
        return tiles

    }


    async deleteTile({auth, request}){
        const {name} = request.post()
        try{
            const affectedRows = await Database.table('tiles').where('name', auth.user.username+'_'+name).delete()
        }catch(e){
            return e.message
        }
        return 'deleted'
    }

}

module.exports = TileController