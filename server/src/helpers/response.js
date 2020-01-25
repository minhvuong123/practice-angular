module.exports = {
    handleSuccess:  (res, { code = 200, ...others }) => {
        res.status(code).json({
            success: true,
            ...others
        });
    },

    handleError:  (res, { code, ...others }) => {
        res.status(code).json({
            error: true,
            ...others
        });
    }
}