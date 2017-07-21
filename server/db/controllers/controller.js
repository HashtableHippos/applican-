// const User = require('../models/User.js');
const User = require('../models/savedJobs.js');
const savedJobs = require('../models/savedJobs.js');
const Contacts = require('../models/contacts.js');
const Notes = require('../models/notes.js');

exports.getUserJobs = (req, res) => {
  const userId = req.user.id;
  savedJobs.findAll({ where: { user_id: userId } })
    .then((jobs) => {
      if (jobs) {
        res.status(200).send(jobs);
        return;
      }
      throw new Error('User Not Found');
    })
    .catch(err => res.status(400).send(err));
};


exports.deleteJob = (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;
  savedJobs.findById(jobId)
    .then((job) => {
      if (job && job.user_id === userId) {
        return job.destroy();
      }
      throw new Error('Job Not Found');
    })
    .then(() => res.status(200).send())
    .catch(err => res.status(400).send(err));
};

exports.updateJobStatus = (req, res) => {
  const jobId = req.params.id;
  const { status } = req.body;
  savedJobs.findById(jobId)
    .then((job) => {
      if (job) {
        return job.update({ status });
      }
      throw new Error('Job Not Found');
    })
    .then(() => res.status(200).send())
    .catch(err => res.status(400).send(err));
};

exports.addJobtoUser = (req, res) => {
  const userId = req.session.passport.user;
  savedJobs.findOrCreate({
    where:
      {
        user_id: userId,
        job_url: req.body.data.job_url,
      },
    defaults: {
      position: req.body.data.position,
      company: req.body.data.company,
      location: req.body.data.location,
      post_date: req.body.data.post_date,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch(err => res.status(400).send(err));
};

exports.addContact = (req, res) => {
  const name = req.body.name || null;
  const position = req.body.position || null;
  const Email = req.body.Email || null;
  const FollowUp = req.body.FollowUp || null;
  const job_id = req.body.id || null;
  Contacts.create({ name, position, Email, FollowUp, job_id })
    .then((contact) => {
      console.log('created contact:', contact);
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.removeContact = (req, res) => {
  const contactId = req.params.id;
  Contacts.findById(contactId)
    .then((contact) => {
      if (contact) {
        return contact.destroy();
      }
      throw new Error('Contact Not Found');
    })
    .then(() => res.status(200).send())
    .catch(err => res.status(400).send(err));
};

exports.getContacts = (req, res) => {
  const userId = req.user.id;
  savedJobs.findAll({ where: { user_id: userId } })
    .then((jobs) => {
      const myJobs = [];
      jobs.forEach((el) => {
        myJobs.push(el.dataValues.id);
      });
      Contacts.findAll({ where: { job_id: myJobs } })
        .then((contacts) => {
          res.status(200).send(contacts);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
  Contacts.findAll()
    .then((contacts) => {
      res.status(200).send(contacts);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};


exports.addNotes = (req, res) => {
  const Start = req.body.Start;
  const Application = req.body.Application;
  const Submit = req.body.Submit;
  const Interview = req.body.Interview;
  const Offer = req.body.Offer;
  const user_id = req.session.passport.user;
  const job_id = req.body.job_id;

  let Column = '';
  let Value = '';
  const List = {
    Start: req.body.Start,
    Application: req.body.Application,
    Submit: req.body.Submit,
    Interview: req.body.Interview,
    Offer: req.body.Offer,
  };
  for (var key in List) {
    if (List[key] !== undefined) {
      Column = key;
      Value = List[key];
    }
  }
  Notes.findAll({ where: { user_id, job_id } })
    .then((data) => {
      if (data.length !== 0) {
        Notes.update({ [Column]: Value }, { where: { user_id, job_id } });
      } else {
        Notes.create({ Start, Application, Submit, Interview, Offer, user_id, job_id })
          .then((notes) => {
            console.log('created notes: ', notes.dataValues);
          })
          .then(() => {
            res.status(200).send();
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
};


exports.retrieveNotes = (req, res) => {
  Notes.findAll()
    .then((notes) => {
      console.log('these are notes from retrieveNotes: ', notes); 
      res.status(200).send(notes);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

