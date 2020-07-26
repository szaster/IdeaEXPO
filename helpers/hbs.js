const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).local().format(format);
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
<<<<<<< HEAD
  editIcon: function (storyUser, loggedUser, ideaId, floating = true) {
    if (storyUser.id.toString() == loggedUser.id.toString()) {
=======
  editIcon: function (ideaUser, loggedUser, ideaId, floating = true) {
    if (ideaUser.id.toString() == loggedUser.id.toString()) {
>>>>>>> master
      if (floating) {
        return `<a href="/ideas/edit/${ideaId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/ideas/edit/${ideaId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return "";
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      );
  },
};
