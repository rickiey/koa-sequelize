import { DataTypes, Model, Sequelize } from "sequelize"

//table name
const TABLENAME: string = "platform"

export class PlatformProperty extends Model {
    public name!: string
    public value!: string
    public digest!: string
    public description!: string
}

export function init(sequelize: Sequelize): void {
    PlatformProperty.init(
        {
            name: {
                type: new DataTypes.STRING(64),
                primaryKey: true
            },
            value: {
                type: new DataTypes.TEXT(),
                allowNull: false
            },
            digest: {
                type: new DataTypes.STRING(256),
                allowNull: false
            },
            description: {
                type: new DataTypes.TEXT(),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: TABLENAME
            // createdAt: false
        }
    )
}
