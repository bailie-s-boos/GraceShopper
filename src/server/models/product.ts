import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Category from './category'

@Table({
  timestamps: true,
  tableName: 'products'
})
class Product extends Model<Product> {
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  price!: number

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string

  @Column({
    type: DataType.TEXT
  })
  imageUrl!: string

  @Column({
    type: DataType.INTEGER
  })
  quantity!: number

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  categoryId!: number

  @BelongsTo(() => Category)
  category!: Category
}

export default Product
