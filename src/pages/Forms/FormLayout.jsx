import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Form,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../components/UI/Button";

import Breadcrumb from "../../components/Common/Breadcrumb";

import { useCreateTransaction } from "../../hooks/useCreateTransaction";

const FormLayout = (props) => {
  const { mutate, isPending } = useCreateTransaction();

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
      description: ""
    },
    validationSchema: yup.object({
      name: yup.string().required(props.t("required field", { fieldName: props.t('Name') })),
      description: yup.string().required(props.t("required field", { fieldName: props.t('Description') })),
    }),
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: () => {
          setAlertData({
            isOpen: true,
            color: "success",
            icon: "mdi mdi-check-all me-2",
            message: props.t("Data sent successfully")
          });

          formik.resetForm();
        },
        onError: (error) => {
          setAlertData({
            isOpen: true,
            color: "danger",
            icon: "mdi mdi-block-helper me-2",
            message: props.t("There was an error sending the data")
          });
        }
      });
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
                    <div className="mb-3">
                      <label htmlFor="name-input">{props.t('Description')}</label>
                      <Input
                        id="application-description"
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Informe a descrição da aplicação"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.description && formik.errors.description ? true : false}
                      />
                      {
                        formik.errors.description && formik.touched.description ? (
                          <FormFeedback type="invalid">{formik.errors.description}</FormFeedback>
                        ) : null
                      }
                    </div>
                    <div>
                      <Button label={props.t('Save')} loading={isPending} t={props.t} />
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
