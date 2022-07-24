module.exports = {
  stringIsAValidUrl: function(string, protocols) {
    console.log('Works');
    try {
      url = new URL(string);
      return protocols
        ? url.protocol
          ? protocols.map(x => `${x.toLowerCase()}:`).includes(url.protocol)
          : false
        : true;
    } catch (err) {
      return false;
    }
  }
};
