import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import ChipInput from 'material-ui-chip-input';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../../../components/CustomButtons/Button.js';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import { DateTimePicker } from '@material-ui/pickers';
import CustomDropdown from '../../../components/CustomDropdown/CustomDropdown.js';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import modalStyle from '../../../assets/jss/material-kit-react/modalStyle.js';

const useStyles = makeStyles(modalStyle);

const HostSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, 'Title Too Short! Min of 8 characters.')
    .max(50, 'Title Too Long! Max is 50 characters.')
    .required('Required'),
  synopsis: Yup.string().max(280, 'Synopsis Too Long! Max is 280 characters.'),

  topics: Yup.array()
    .min(1, 'You need at least 1 topic. Click enter to input topic')
    .max(5, 'You can have a maximum of 5 topics.')
});

const CreateDebateForm = ({ handleSubmit, closeModal }) => {
  const classes = useStyles();
  //Needed to style Chip as MU
  const chipRenderer = (
    { chip, className, handleClick, handleDelete },
    key
  ) => (
    <Chip
      //size="small"
      label={chip}
      onDelete={handleDelete}
      color="primary"
      key={key}
      className={classes.chip}
    />
  );

  return (
    <Formik
      initialValues={{
        title: '',
        synopsis: '',
        language: 'English',
        schedule: new Date(),
        duration: '30 mins',
        topics: []
      }}
      validationSchema={HostSchema}
      onSubmit={(values, { setSubmitting, resetForm, initialValues }) => {
        setTimeout(() => {
          setSubmitting(false);
          handleSubmit(values);
          resetForm(initialValues);
        }, 500);
      }}
    >
      {({
        setFieldValue,
        values,
        submitForm,
        isSubmitting,
        initialValues,
        touched,
        resetForm,
        errors
      }) => (
        <Form>
          <DialogTitle id="signup-title" className={classes.modalHeader}>
            <VoiceChatIcon fontSize="large" color="primary" />
            <div>Host a Debate</div>
          </DialogTitle>
          <DialogContent className={classes.modalBody}>
            <Box margin={1}>
              <Field
                component={TextField}
                name="title"
                type="text"
                label="Title"
                fullWidth
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                name="synopsis"
                type="text"
                label="Synopsis"
                fullWidth
                placeholder="Explain the debate topic, situation and your position."
                multiline
              />
            </Box>
            <Box margin={1}>
              <Field
                component={CustomDropdown}
                name="language"
                buttonText="Language"
                dropdownList={['عربي', 'English', 'Français']}
                onClick={v => setFieldValue('language', v)}
              />
              {<p>{values.language}</p>}
            </Box>
            <Box margin={1}>
              <Field
                component={DateTimePicker}
                name="schedule"
                type="date"
                label="Schedule"
                fullWidth
                placeholder={'Set Date & Time for your debate.'}
                multiline
                disablePast
                //minutesStep={30}
                value={values.schedule}
                onChange={v => setFieldValue('schedule', v)}
              />
            </Box>
            <Box margin={1}>
              <Field
                component={CustomDropdown}
                id="duration"
                name="duration"
                buttonText="Duration"
                dropdownList={['30 mins', '45 mins', '1 hr']}
                onClick={v => setFieldValue('duration', v)}
              />
              {<p>{values.duration}</p>}
            </Box>
            <Box margin={1}>
              <FieldArray
                name="topics"
                render={arrayHelpers => (
                  <Field
                    name="topics"
                    component={ChipInput}
                    type="text"
                    label="Topics"
                    value={values.topics}
                    margin="none"
                    onAdd={chip => arrayHelpers.push(chip)}
                    onDelete={chip =>
                      arrayHelpers.remove(values.topics.indexOf(chip))
                    }
                    blurBehavior="add"
                    //clearOnBlur
                    fullWidth
                    chipRenderer={chipRenderer}
                    helperText={errors.topics ? errors.topics : ''}
                    error={errors.topics ? true : false}
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + ' ' + classes.modalFooterCenter}
          >
            <Button
              onClick={() => {
                resetForm(initialValues);
                closeModal();
              }}
              color="github"
              //disabled={loading}
              round
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" round>
              Next
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default CreateDebateForm;
