module.exports = {
  // Why couldn't Mongo just use "id"?
  name: 'CharClass'
  , idAttribute: '_id'
  , relations: {
    hasMany: {
      CharClass: {
        localField: 'children'
        , foreignKey: 'parent_id'
      }
    }
    , belongsTo: {
      CharClass: {
        localField: 'parent'
        , localKey: 'parent_id'
      }
    }
  }
};
