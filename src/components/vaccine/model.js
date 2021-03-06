const { instance, Sequelize } = require('@lib/postgres')
const Joi = require('@hapi/joi')
const VaccineTranslations = require('./translation-model')

const Model = instance.define(
  'Vaccine',
  {
    name: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
)

Model.createFields = Joi.object({
  name: Joi.string().required(),
  VaccineTranslations: Joi.array()
    .items(VaccineTranslations.createFields)
    .min(1)
    .required()
})

module.exports = Model
