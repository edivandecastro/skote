import React from "react";
import { withTranslation } from "react-i18next";
import { Container, Row, Col, Card, CardTitle, CardBody, Form, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";

import Breadcrumb from "../../components/Common/Breadcrumb";

const FormLayout = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("O nome é obrigatório"),
    }),
    onSubmit: (values) => {
      console.log(values);
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
