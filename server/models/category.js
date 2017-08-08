module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Category.belongsTo(models.Book, {
          foreignKey: 'book_id',
        });
      },
    },
  });
  return Category;
};