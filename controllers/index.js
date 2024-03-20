exports.getHomePage = (req, res, next) => {
    res.render('index')
}

exports.signUp = (req, res, next) => {
    res.render('signup')
}

exports.showMembersPage = (req, res) => {
    res.render('members')
}

exports.admin = (req, res) => {
    res.render('admin')
}