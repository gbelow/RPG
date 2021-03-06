'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Image extends Model {
    users () {
      return this.belongsTo('App/Models/User')
    }

    imageTypes(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Image
