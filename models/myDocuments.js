// import dependancy
const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    civilId: {
      type: String,
    },
    f_image: {
      type: String,
    },
    b_image: {
      type: String,
    },

    passport_no: {
      type: String,
    },
    passportFull_name: {
      type: String,
    },
    status:{
        type:String
    },
    doc_status:{
        type:String
    }
  },
  { timestamps: true }
);
module.exports = documentsModel = mongoose.model("mydocument", documentSchema);
