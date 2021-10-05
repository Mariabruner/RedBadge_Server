const UserModel = require("./user")
const CharacterModel = require("./character")
const FightModel = require("./fight")
const SuggestionModel = require("./suggestion")


// CharacterModel.hasMany(FightModel, {foreignKey: "characterOneId"});
// CharacterModel.hasMany(FightModel, {foreignKey: "characterTwoId"});
// FightModel.belongsTo(CharacterModel)

module.exports = {  
    UserModel, 
    CharacterModel, 
    FightModel,
    SuggestionModel }