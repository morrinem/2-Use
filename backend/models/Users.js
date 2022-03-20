module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        university: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
    })

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        })
    }



    return Users
}