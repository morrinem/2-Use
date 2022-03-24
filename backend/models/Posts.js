module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

    Posts.associate = (models) => {
        Posts.belongsTo(models.Users, {
            onDelete: "cascade",
        })
    }

    return Posts
}
