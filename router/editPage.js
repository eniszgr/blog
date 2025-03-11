const express = require('express');
const path = require('path');
const router = express.Router();
const { join } = require('path');
const Content = require(join(__dirname, '..', 'model', 'contentModel.js'));

router.get('/:id', async (req, res) => {
  try {
    if (!res.locals.user) {
      return res.redirect('/error');
    }

    const { id } = req.params;
    const data = await Content.findById(id).exec();

    return res.render('site/edit', {
      data: data.toJSON(),
    });
  } catch (error) {
    console.log(error);
    return res.redirect('/error');
  }
});

router.post('/', async (req, res) => {
  try {
    if (!res.locals.user) {
      return res.json({
        case: false,
        message: 'unauthorized',
      });
    }

    const { title, content, name, _id } = req.body;
    const file = req.files ? req.files.file : null;

    if (!title || !content || !name || !_id || !file) {
      return res.json({
        case: false,
        message: "data couldn't be sent",
      });
    }

    // Create unique name
    const extension = file.mimetype.split('/')[1]; // Get extension
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
    const pathName = join(__dirname, '..', 'public', 'img', 'content', uniqueName);

    file.mv(pathName, async (err) => {
      if (err) {
        return res.json({
          case: false,
          message: "file couldn't be uploaded",
        });
      }
      try {
        await Content.findByIdAndUpdate(_id, {
          $set: {
            title,
            content,
            name,
            path: `/img/content/${uniqueName}`,
          },
        });

        return res.json({
          case: true,
          message: 'successfully updated',
        });
      } catch (error) {
        console.log(error);
        return res.json({
          case: false,
          message: 'unexpected error',
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({
      case: false,
      message: 'unexpected error',
    });
  }
});

module.exports = router;