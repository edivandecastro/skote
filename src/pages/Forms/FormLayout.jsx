import React from "react";
import { withTranslation } from "react-i18next";
import { Container, Row, Col, Card, CardTitle, CardBody, Form, Input } from "reactstrap";

import Breadcrumb from "../../components/Common/Breadcrumb";

const FormLayout = (props) => {
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

                  <Form onSubmit={e => e.preventDefault()}>
                    <div className="mb-3">
                      <label htmlFor="name-input">{props.t('Name')}</label>
                      <Input type="text" className="form-control" id="name-input" />
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
