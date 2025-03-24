import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Container, Row, Col, Card, CardTitle, CardBody, Form, Input, FormFeedback, UncontrolledAlert, Alert } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { baseURL } from "../../service/api_service";

import Breadcrumb from "../../components/Common/Breadcrumb";

const FormLayout = (props) => {
  const [alertData, setAlertData] = useState({
    isOpen: false,
    color: "",
    icon: "",
    message: ""
  });

  const onDismissAlert = () => {
    setAlertData({ ...alertData, isOpen: false });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("O nome é obrigatório"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/v1/transactions', values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          setAlertData({
            isOpen: true,
            color: "success",
            icon: "mdi mdi-check-all me-2",
            message: props.t('Data sent successfully'),
          });
        }
      } catch (error) {
        setAlertData({
          isOpen: true,
          color: "danger",
          icon: "mdi mdi-block-helper me-2",
          message: props.t('There was an error sending the data'),
        });
      }
    }
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title='Form' breadcrumbItem="Form Layouts" />
          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">{props.t('Application')}</CardTitle>

                  <Alert color={alertData.color} isOpen={alertData.isOpen} toggle={onDismissAlert}>
                    <i className={alertData.icon}></i>{alertData.message}
                  </Alert>

                  <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name-input">{props.t('Name')}</label>
                      <Input
                        id="application-name"
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Informe o nome da aplicação"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.name && formik.errors.name ? true : false}
                      />
                      {
                        formik.errors.name && formik.touched.name ? (
                          <FormFeedback type="invalid">{formik.errors.name}</FormFeedback>
                        ) : null
                      }
                    </div>
                    <div>
                      <button type="submit" className="btn btn-primary w-md">
                        {props.t('Save')}
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withTranslation()(FormLayout);
