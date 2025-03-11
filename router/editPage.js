const express = require('express');
const path = require('path');
const router = express.Router();
const { join } = require('path');
const Content = require(join(__dirname, '..', 'model', 'contentModel.js'));
const fs = require('fs'); // file system

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
    //authorization check
    if (!res.locals.user) {
      return res.json({
        case: false,
        message: 'unauthorized',
      });
    }

    const { title, content, name, _id } = req.body;
    const file = req.files ? req.files.file : null;

    if (!title || !content || !name || !_id) {
      return res.json({
        case: false,
        message: "data couldn't be sent",
      });
    }

    const existingContent = await Content.findById(_id).exec();
    if (!existingContent) {
      return res.json({
        case: false,
        message: "content couldn't be found",
      });
    }

    let imagePath = existingContent.path; //img path already exist

    // If there is a new file or not
    if (file) {//for new file
      // Delete the old image file
      const oldImagePath = path.join(__dirname, '..', 'public', existingContent.path);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log('Error deleting old image:', err);
        }
      });

      // Create unique name for the new image
      const extension = file.mimetype.split('/')[1]; // Get extension
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;//unique name
      const pathName = join(__dirname, '..', 'public', 'img', 'content', uniqueName);

      file.mv(pathName, async (err) => {    //to save the file to the pathName adress
        if (err) {
          return res.json({
            case: false,
            message: "file couldn't be uploaded",
          });
        }
        imagePath = `/img/content/${uniqueName}`;

        try {
          await Content.findByIdAndUpdate(_id, {
            $set: {
              title,
              content,
              name,
              path: imagePath,
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
    } else {    //if file is not exist
      try {
        await Content.findByIdAndUpdate(_id, {
          $set: {
            title,
            content,
            name,
            path: imagePath, //old path
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
    }
  } catch (error) {
    console.log(error);
    return res.json({
      case: false,
      message: 'unexpected error',
    });
  }
});

module.exports = router;