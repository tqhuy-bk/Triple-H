const Helps = require('../Models/help.model');
const { ip2position } = require('../utils/ip2position');

class HelpController {
  async createHelp(req, res) {
    try {
      let { position, ip } = req.body;

      console.log('CREATE HELP BODY', req.body);

      const today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      console.log('HEADER CREATE HELP:', req.headers);
      if (!position) {
        let temp;
        if (ip) {
          temp = ip2position(ip);
        } else temp = ip2position(req.headers['x-forwarded-for']);
        position = [temp.longitude, temp.latitude];
      }

      const help = new Helps({
        userId: req.user._id,
        expireAt: tomorrow,
        position,
        ...req.body
      });
      await help.save();
      res.created({
        success: true,
        help: {
          ...help._doc,
          userId: {
            _id: req.user._id,
            fullname: req.user.fullname,
            avatar: req.user.avatar
          }
        }
      });
    } catch (err) {
      console.log(err);
      res.error(err);
    }
  }

  async getHelps(req, res) {
    try {
      let { lat, lng, ip } = req.query;
      // console.log('GET HELP POSITION:', lat, lng, ip);
      if (!lat || !lng || lat === 'undefined' || lng === 'undefined') {
        let ipClient;
        if (ip) {
          ipClient = ip;
        } else {
          if (!req.headers['x-forwarded-for']) {
            return res.error({ message: 'Not found your position' });
          }
          ipClient = req.headers['x-forwarded-for'];
        }
        // console.log('HEADER GET HELP:', req.headers);
        // if (!req.headers['x-forwarded-for']) {
        //   return res.error({ message: 'Not found your position' });
        // }
        let temp = ip2position(ipClient);
        lat = temp.latitude;
        lng = temp.longitude;
      }

      // console.log('GET HELP:', lat, lng);
      lat = parseFloat(lat);
      lng = parseFloat(lng);

      const helps = await Helps.find({
        position: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            },
            $maxDistance: 5000
          }
        }
      })
        .sort('-updatedAt')
        .populate('userId', 'avatar fullname')
        .populate('state', 'avatar fullname');
      res.success({
        success: true,
        helps
      });
    } catch (err) {
      console.log(err);
      res.error(err);
    }
  }

  async getMyHelps(req, res) {
    try {
      const helps = await Helps.find({ userId: req.user._id })
        .populate('userId', 'avatar fullname')
        .populate('state', 'avatar fullname');
      res.success({
        success: true,
        helps
      });
    } catch (err) {
      res.error(err);
    }
  }

  async updateHelp(req, res) {
    try {
      const { id } = req.params;
      const help = await Helps.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        req.body
      )
        .populate('userId', 'avatar fullname')
        .populate('state', 'avatar fullname');

      res.success({
        success: true,
        help
      });
    } catch (err) {
      console.log(err);
      res.error(err);
    }
  }

  async help(req, res) {
    try {
      const { id } = req.params;
      const help = await Helps.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            state: req.user._id
          }
        },
        { new: true }
      )
        .populate('userId', 'avatar fullname')
        .populate('state', 'avatar fullname');

      res.success({
        success: true,
        help
      });
    } catch (err) {
      res.error(err);
    }
  }

  async cancelHelp(req, res) {
    try {
      const { id } = req.params;
      const help = await Helps.findByIdAndUpdate(
        id,
        {
          $pull: { state: req.user._id }
        },
        { new: true }
      )
        .populate('userId', 'avatar fullname')
        .populate('state', 'avatar fullname');

      res.success({
        success: true,
        help
      });
    } catch (err) {
      res.error(err);
    }
  }

  async getHelpDetail(req, res) {
    try {
      const { id } = req.params;
      const help = await Helps.findById(id)
        .populate('userId', 'avatar fullname')
        .populate('state', 'avatar fullname');
      if (!help) return res.notFound('Không tìm thấy trợ giúp');
      res.success({
        success: true,
        help
      });
    } catch (err) {
      res.error(err);
    }
  }

  async deleteHelp(req, res) {
    try {
      const { id } = req.params;
      await Helps.findOneAndRemove({ _id: id, userId: req.user._id });
      res.deleted();
    } catch (err) {
      res.error(err);
    }
  }
}

module.exports = new HelpController();
