module.exports = (target, paramsHandler=(_=>{}), resultHandler=(_=>{})) => process.env.NODE_ENV === `development` ? new Proxy(target, {
    apply: target.constructor === (async _=>{}).constructor ? async (original, ctx, params) => {
        await paramsHandler.apply(ctx, params);
        const result = await original.apply(ctx, params);
        await resultHandler.call(ctx, result);
        return result;
    } : (original, ctx, params) => {
        paramsHandler.apply(ctx, params);
        const result = original.apply(ctx, params);
        resultHandler.call(ctx, result);
        return result;
    }
}) : target;
