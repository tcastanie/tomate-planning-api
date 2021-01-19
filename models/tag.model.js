module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            color: String,
            desc: String,
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Tag = mongoose.model("tag", schema);
    return Tag;
};