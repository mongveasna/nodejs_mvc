
module.exports = {
    async landing(ctx, next) {
        await ctx.render("index", {})
    },
    async admin(ctx, next) {
        await ctx.render("admin", {});
    },
    async socket(ctx, next) {
        var client1 = CORE.REDIS.createClient();
        client1.publish('admin', '122121');
        ctx.success("sdddddddddddddd");
    }
};