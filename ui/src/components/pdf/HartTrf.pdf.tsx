import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    height: "100px",
    padding: 20,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
  },
  section: {
    marginBottom: 10,

    backgroundColor: "#999",
  },
  titleHeadings: {
    backgroundColor: "#8dcfd9",
    color: "black",
    textAlign: "center",
    paddingVertical: 4,
    fontSize: 9,
    fontWeight: "bold",
  },

  rectangle: {
    height: 8,
    width: 8,
    borderColor: "black",
    borderWidth: 1,
    padding: 4,
  },

  rectangelText: {
    fontSize: 9,
  },
  flex_row: {
    display: "flex",
    flexDirection: "row",
  },

  rectangleContainer: {
    display: "flex",
    flexDirection: "row",
    // alignContent: "flex-end",
    gap: 4,

    flexWrap: "wrap",
  },

  titleText: {
    color: "#999",
    marginBottom: 1,
    paddingHorizontal: 2,
    fontSize: 9,
  },

  headingText: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",

    fontWeight: 500,
  },

  smallText: {
    fontSize: 8,
  },
  innerContainer: {
    flex: 1,
    // paddingTop: 1,
    display: "flex",
    flexDirection: "row",
    // gap: 2,
  },

  innerContainerCol: {
    color: "#999",
    fontSize: 10,
    flex: 1,
    // paddingTop: 1,
    display: "flex",
    flexDirection: "column",
    // paddingHorizontal: 3,
    gap: 2,
  },

  valueText: {
    color: "black",
    flexWrap: "wrap",
    fontSize: 9,
    display: "flex",
  },

  labelText: {
    fontSize: 9,
    color: "#999",
  },

  singleCheckBox: {
    color: "#999",
    fontSize: 8,
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
});

export default function HartTrfPdf() {
  return (
    <Document>
      <Page style={styles.page}>
        {/* top logo */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* first empty column */}
          <View style={{ flex: 1 }}></View>

          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Logo text
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                TEST REQUISITION FORM
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                borderColor: "black",
                borderWidth: 1,
                maxWidth: 70,
                maxHeight: 60,
                display: "flex",
                flexWrap: "wrap",
                padding: 4,
                justifyContent: "center",
                fontSize: 9,
                alignItems: "flex-end",
              }}
            >
              <Text>Attach TRF Label Here</Text>
            </View>
          </View>
        </View>

        {/* First part  */}

        <View
          style={{
            borderTopColor: "red",
            borderTopStyle: "dotted",
            borderTopWidth: 2,
            borderRightColor: "red",
            borderRightWidth: 1,
            borderLeftColor: "red",
            borderLeftWidth: 1,
          }}
        >
          {/* PATIENT + PROVIDER TITLE BAR */}
          <View style={styles.headingText}>
            <View
              style={[
                styles.titleHeadings,
                {
                  flex: 1,
                  paddingVertical: 4,
                  borderRightColor: "red",
                  borderRightWidth: 2,
                  borderRightStyle: "dotted",
                },
              ]}
            >
              <Text style={{ textAlign: "center" }}>ACCOUNT INFORMATION</Text>
            </View>
            <View
              style={[styles.titleHeadings, { flex: 1, paddingVertical: 4 }]}
            >
              <Text style={{ textAlign: "center" }}>PROVIDER INFORMATION</Text>
            </View>
          </View>

          {/* first row */}
          <View style={{ display: "flex", flexDirection: "row" }}>
            {/* Account information */}
            {/* clinc name, patient last name, patient first name */}
            <View
              style={[
                styles.innerContainer,
                {
                  display: "flex",
                  borderRight: 1,
                  flexDirection: "row",
                  // alignItems: "center",
                  // borderRightColor: "red",
                  borderRightColor: "red",
                  //   borderTop: 1,
                  borderTopColor: "#ccc",
                  paddingVertical: 4,
                  paddingHorizontal: 4,
                  flex: 1,
                },
              ]}
            >
              <Text style={[styles.labelText, { marginBottom: 1 }]}>
                Clinic Name:
              </Text>

              <Text style={[styles.valueText]}>Random Clinic</Text>
            </View>
            <View
              style={[
                styles.flex_row,
                {
                  flex: 1,
                  justifyContent: "flex-start",
                  paddingHorizontal: 4,
                },
              ]}
            >
              <View
                style={[
                  styles.innerContainerCol,
                  { borderRightColor: "#ccc", borderRightWidth: 1 },
                ]}
              >
                <Text style={styles.labelText}>Patient Last Name</Text>
                <Text style={styles.valueText}>Cena</Text>
              </View>
              <View
                style={[styles.innerContainerCol, { paddingHorizontal: 4 }]}
              >
                <Text style={[styles.labelText]}>Patient First Name</Text>
                <Text style={styles.valueText}>John</Text>
              </View>
            </View>
          </View>

          {/* second row */}
          <View
            style={[
              styles.flex_row,
              { borderTopWidth: 1, borderTopColor: "#ccc" },
            ]}
          >
            <View
              style={[
                styles.innerContainer,
                {
                  flex: 1,
                  borderRight: 1,
                  borderRightColor: "red",
                  paddingHorizontal: 4,
                  gap: 2,
                },
              ]}
            >
              <View style={[styles.labelText]}>
                <Text>Address:</Text>
              </View>
              <View>
                <Text style={[styles.valueText]}>New Road</Text>
              </View>
            </View>
            {/* second row second outer column */}
            <View
              style={[
                styles.flex_row,
                {
                  flex: 1,
                  paddingHorizontal: 4,
                },
              ]}
            >
              <View style={[styles.innerContainerCol, {}]}>
                <Text>Date of Birth</Text>
                <Text style={[styles.valueText]}>09-13-1990</Text>
              </View>

              <View
                style={[
                  styles.rectangleContainer,
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    gap: 20,
                    borderLeftWidth: 1,
                    borderLeftColor: "#ccc",
                    paddingHorizontal: 4,
                  },
                ]}
              >
                <Text style={styles.labelText}>Sex</Text>
                <View style={[styles.singleCheckBox, { alignItems: "center" }]}>
                  <View style={[styles.rectangle, { marginTop: 4 }]}></View>
                  <Text>Male</Text>
                </View>

                <View style={[styles.singleCheckBox, { alignItems: "center" }]}>
                  <View
                    style={[
                      styles.rectangle,
                      { marginTop: 4, paddingVertical: 4 },
                    ]}
                  ></View>
                  <Text>Female</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Third row */}
          <View
            style={[
              styles.flex_row,
              { borderTopWidth: 1, borderTopColor: "#ccc" },
            ]}
          >
            <View
              style={[
                styles.innerContainer,
                {
                  paddingHorizontal: 4,
                  borderRightColor: "red",
                  borderRightWidth: 1,
                },
              ]}
            >
              <View
                style={[
                  styles.innerContainerCol,
                  {
                    flex: 2,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    paddingVertical: 4,
                  },
                ]}
              >
                <Text style={[styles.labelText]}>City</Text>
                <Text style={[styles.valueText]}>Kathmandu</Text>
              </View>

              <View
                style={[
                  styles.innerContainerCol,
                  {
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    paddingHorizontal: 4,
                  },
                ]}
              >
                <Text style={[styles.labelText]}>State</Text>
                <Text style={[styles.valueText]}>Bagmati lorem</Text>
              </View>

              <View
                style={[styles.innerContainerCol, { paddingHorizontal: 4 }]}
              >
                <Text style={[styles.labelText]}>Zip Code</Text>
                <Text style={[styles.valueText]}>zip code</Text>
              </View>
            </View>

            {/* third row second outer column */}
            <View
              style={[
                {
                  flex: 1,
                  justifyContent: "flex-start",
                  paddingVertical: 4,
                  paddingHorizontal: 4,
                },
              ]}
            >
              <View
                style={[
                  styles.innerContainerCol,
                  { display: "flex", flexDirection: "row" },
                ]}
              >
                <View style={{}}>
                  <Text style={styles.labelText}>Street Address:</Text>
                </View>
                <View style={{}}>
                  <Text style={[styles.valueText]}>New Road street</Text>
                </View>
              </View>
            </View>
          </View>

          {/* fourth row */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: "#ccc",
            }}
          >
            <View
              style={[
                styles.innerContainer,
                {
                  display: "flex",
                  borderRightColor: "red",
                  borderRightWidth: 1,
                },
              ]}
            >
              <View
                style={[
                  styles.innerContainer,
                  {
                    borderRight: 1,
                    borderRightColor: "#ccc",
                    //   borderTop: 1,
                    borderTopColor: "#ccc",
                    flex: 1,
                    paddingHorizontal: 4,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.labelText]}>Phone Number:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.valueText]}>123123123</Text>
                </View>
              </View>

              <View
                style={[
                  styles.innerContainer,
                  {
                    display: "flex",
                    //   borderTop: 1,
                    borderTopColor: "#ccc",
                    paddingHorizontal: 4,
                    flex: 1,
                    justifyContent: "flex-start",
                    gap: 2,
                    flexWrap: "wrap",
                  },
                ]}
              >
                <View style={{}}>
                  <Text style={[styles.labelText]}>Fax Number:</Text>
                </View>

                <View
                  style={{ display: "flex", flexWrap: "wrap", flexShrink: 1 }}
                >
                  <Text style={[styles.valueText]}>
                    1231231231231239182930adsfasdfasdfasdfasdfasdfsdf
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.flex_row,
                {
                  flex: 1,
                  justifyContent: "flex-start",
                  // paddingHorizontal: 4,
                },
              ]}
            >
              <View
                style={[
                  styles.innerContainerCol,
                  {
                    flex: 2,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    paddingHorizontal: 4,
                  },
                ]}
              >
                <Text style={[styles.labelText]}>City</Text>
                <Text style={styles.valueText}>New City</Text>
              </View>
              <View
                style={[
                  styles.innerContainerCol,
                  {
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    paddingHorizontal: 4,
                  },
                ]}
              >
                <Text style={[styles.labelText]}>State</Text>
                <Text style={styles.valueText}>lorem</Text>
              </View>
              <View
                style={[styles.innerContainerCol, { paddingHorizontal: 4 }]}
              >
                <Text style={[styles.labelText]}>ZipCode</Text>
                <Text style={styles.valueText}>4460</Text>
              </View>
            </View>
          </View>

          {/* fifth row */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: "#ccc",
            }}
          >
            <View
              style={[
                styles.innerContainer,
                {
                  display: "flex",
                  borderRightWidth: 1,
                  borderRightColor: "red",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  //   borderTop: 1,
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                  flex: 1,
                  gap: 2,
                },
              ]}
            >
              <Text style={styles.labelText}>Clinic Contact</Text>

              <Text style={[styles.valueText]}>
                Clinic contact addresss Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Esse impedit minus voluptas, distinctio ut
                soluta ratione expedita tenetur amet vel! Doloremque ullam
                officia hic sapiente dolorum dolore distinctio quia
                consequuntur.
              </Text>
            </View>
            <View
              style={[
                styles.flex_row,
                {
                  flex: 1,
                  justifyContent: "flex-start",
                  paddingHorizontal: 4,
                },
              ]}
            >
              <View
                style={[
                  styles.innerContainerCol,
                  { borderRightWidth: 1, borderRightColor: "#ccc" },
                ]}
              >
                <Text style={[styles.labelText]}>Phone Number</Text>
                <Text style={styles.valueText}>123129310293</Text>
              </View>

              <View style={[styles.innerContainerCol, {}]}>
                <Text style={[styles.labelText]}>Email</Text>
                <Text style={styles.valueText}>clinic@email.com</Text>
              </View>
            </View>
          </View>

          {/* sixth row */}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: "#ccc",
            }}
          >
            <View
              style={[
                styles.innerContainer,
                {
                  display: "flex",
                  borderRightWidth: 1,
                  borderRightColor: "red",
                  //   borderTop: 1,
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                  flex: 1,
                  flexWrap: "wrap",
                },
              ]}
            >
              <View>
                <Text style={styles.labelText}>Contact Email</Text>
              </View>
              <View>
                <Text style={[styles.valueText]}>
                  Clinic contact addresss Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Architecto iste soluta magnam
                  magni quisquam tempore obcaecati autem qui aut consequuntur
                  sed impedit hic, rerum quos eaque minima sunt aspernatur
                  eveniet!
                </Text>
              </View>
            </View>
            {/* second column */}
            <View
              style={[
                styles.flex_row,
                {
                  flex: 1,
                  justifyContent: "flex-start",
                  paddingHorizontal: 4,
                },
              ]}
            >
              <View style={[styles.innerContainerCol, {}]}>
                <Text style={styles.labelText}>Race and ethnicity</Text>
                <View
                  style={[
                    styles.rectangleContainer,
                    { paddingLeft: 15, paddingVertical: 4 },
                  ]}
                >
                  <View
                    style={[styles.singleCheckBox, { alignItems: "center" }]}
                  >
                    <View style={[styles.rectangle, { marginTop: 4 }]}></View>
                    <Text style={[styles.labelText]}>White</Text>
                  </View>

                  <View
                    style={[styles.singleCheckBox, { alignItems: "center" }]}
                  >
                    <View
                      style={[
                        styles.rectangle,
                        { marginTop: 4, paddingVertical: 4 },
                      ]}
                    ></View>
                    <Text style={[styles.labelText]}>
                      Black or African American
                    </Text>
                  </View>

                  <View
                    style={[styles.singleCheckBox, { alignItems: "center" }]}
                  >
                    <View style={[styles.rectangle, { marginTop: 4 }]}></View>
                    <Text style={[styles.labelText]}>Hispanic or Latino</Text>
                  </View>

                  <View
                    style={[styles.singleCheckBox, { alignItems: "center" }]}
                  >
                    <View style={[styles.rectangle, { marginTop: 4 }]}></View>
                    <Text style={[styles.labelText]}>Asian</Text>
                  </View>

                  <View
                    style={[styles.singleCheckBox, { alignItems: "center" }]}
                  >
                    <View style={[styles.rectangle, { marginTop: 4 }]}></View>
                    <Text style={[styles.labelText]}>
                      American Indian or Alaska Native
                    </Text>
                  </View>

                  <View
                    style={[styles.singleCheckBox, { alignItems: "center" }]}
                  >
                    <View style={[styles.rectangle, { marginTop: 4 }]}></View>
                    <Text style={[styles.labelText]}>Other</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* End of first part */}

        {/* Clinic information */}

        <View
          style={[
            styles.headingText,
            {
              borderRightColor: "red",
              borderLeftColor: "red",
              borderRightWidth: 1,
              borderLeftWidth: 1,
            },
          ]}
        >
          <View style={[styles.titleHeadings, { flex: 1, paddingVertical: 4 }]}>
            <Text style={{ paddingHorizontal: 2, textAlign: "center" }}>
              CLINIC INFORMATION
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#4c59e0",
            paddingVertical: 1,
            borderRightColor: "red",
            borderLeftColor: "red",
            borderRightWidth: 1,
            borderLeftWidth: 1,
          }}
        >
          <Text
            style={{
              paddingHorizontal: 2,
              textAlign: "center",
              color: "white",
              fontSize: 9,
            }}
          >
            PROVIDE MOST RECENT VALUES
          </Text>
        </View>

        {/* weight and height  */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            borderRightColor: "red",
            borderRightWidth: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              //   borderTop: 1,
              borderRightColor: "#ccc",
              borderTopColor: "#ccc",
              paddingHorizontal: 1,
              paddingVertical: 4,
              flex: 1,
              borderLeftColor: "red",
              borderRightWidth: 1,
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={[
                styles.labelText,
                {
                  paddingHorizontal: 2,
                  marginBottom: 1,
                },
              ]}
            >
              Weight (lbs.)
            </Text>
            <Text style={[styles.valueText, { paddingHorizontal: 2 }]}>
              200lbs
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              borderRight: 1,
              borderRightColor: "#ccc",
              //   borderTop: 1,
              borderTopColor: "#ccc",
              paddingHorizontal: 1,
              paddingVertical: 4,
              flex: 1,
            }}
          >
            <Text
              style={[
                styles.labelText,
                { paddingHorizontal: 2, marginBottom: 1 },
              ]}
            >
              Height (inches)
            </Text>
            <Text style={[styles.valueText, { paddingHorizontal: 2 }]}>6'</Text>
          </View>

          {/* Angioplasty or stent */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              borderRight: 1,
              borderRightColor: "#ccc",
              //   borderTop: 1,
              borderTopColor: "#ccc",
              paddingHorizontal: 1,
              paddingVertical: 4,
              flex: 1,
              gap: 4,
            }}
          >
            <Text
              style={[
                styles.labelText,
                {
                  paddingHorizontal: 2,
                  marginBottom: 1,
                },
              ]}
            >
              Angioplasty or Stent
            </Text>
            <View style={[styles.flex_row, { gap: 15 }]}>
              <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}></View>
                <Text style={styles.labelText}>No</Text>
              </View>

              <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}></View>
                <Text style={styles.labelText}>Yes</Text>
              </View>

              <View style={styles.rectangleContainer}>
                <Text style={styles.labelText}>Date</Text>
              </View>
            </View>

            <Text style={{ fontSize: 12, paddingHorizontal: 2 }}></Text>
          </View>

          {/* Coronary Artery Bypass Graft CABG */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              //   borderTop: 1,
              borderTopColor: "#ccc",
              paddingHorizontal: 1,
              flex: 1,
              gap: 4,
            }}
          >
            <Text
              style={[
                styles.labelText,
                { paddingHorizontal: 2, marginBottom: 1 },
              ]}
            >
              Coronary Artery Bypass Graft (CABG)
            </Text>
            <View style={[styles.flex_row, { gap: 15 }]}>
              <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}></View>
                <Text style={styles.labelText}>No</Text>
              </View>

              <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}></View>
                <Text style={styles.labelText}>Yes</Text>
              </View>

              <View style={styles.rectangleContainer}>
                <Text style={styles.labelText}>Date</Text>
              </View>
            </View>

            <Text style={{ fontSize: 12, paddingHorizontal: 2 }}></Text>
          </View>
        </View>

        {/* diagnosis and billing information */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottomColor: "red",
            borderBottomStyle: "dotted",
            borderBottomWidth: 2,
          }}
        >
          {/* first column */}
          <View
            style={{
              flex: 2,
              // paddingVertical: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={[
                styles.titleHeadings,
                {
                  paddingHorizontal: 2,
                  paddingVertical: 4,
                  borderRightColor: "red",
                  borderRightStyle: "dotted",
                  borderRightWidth: 2,
                  borderBottomColor: "red",
                  borderBottomStyle: "dotted",
                  borderBottomWidth: 2,
                  borderTopColor: "red",
                  borderTopStyle: "dotted",
                  borderTopWidth: 2,
                  borderLeftColor: "red",
                  borderLeftWidth: 1,
                },
              ]}
            >
              <Text style={{ textAlign: "center" }}>DIAGNOSIS INFORMATION</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                borderRightWidth: 1,
                borderRightColor: "red",
                borderLeftColor: "red",
                borderLeftWidth: 1,
              }}
            >
              <View
                style={{
                  borderTopColor: "#ccc",
                  borderTopWidth: 1,
                  borderBottom: "#ccc",
                  borderBottomWidth: 1,
                  minHeight: 22,
                  display: "flex",
                  color: "white",
                  flexDirection: "column",
                  gap: 1,
                  backgroundColor: "#4c59e0",
                }}
              >
                <Text
                  style={[
                    styles.valueText,
                    { fontWeight: "bold", color: "white", marginLeft: 3 },
                  ]}
                >
                  ICD10 CODE/S REQUIRED
                </Text>

                <Text style={[{ marginLeft: 3, fontSize: 6 }]}>
                  (commonly used ICD10 codes are provided on the back)
                </Text>
              </View>
              <View
                style={{
                  borderTopColor: "#ccc",
                  borderTopWidth: 1,
                  borderBottom: "#ccc",
                  borderBottomWidth: 1,
                  minHeight: 22,
                }}
              >
                <Text style={[styles.valueText, { marginLeft: 3 }]}>
                  ICD10Code
                </Text>
              </View>
              <View
                style={{
                  borderTopColor: "#ccc",
                  borderTopWidth: 1,
                  borderBottom: "#ccc",
                  borderBottomWidth: 1,
                  minHeight: 22,
                }}
              >
                <Text style={[styles.valueText, { marginLeft: 3 }]}>
                  ICD10Code
                </Text>
              </View>{" "}
              <View
                style={{
                  borderTopColor: "#ccc",
                  borderTopWidth: 1,
                  borderBottom: "#ccc",
                  borderBottomWidth: 1,
                  minHeight: 22,
                }}
              >
                <Text style={[styles.valueText, { marginLeft: 3 }]}>
                  ICD10Code
                </Text>
              </View>{" "}
              <View
                style={{
                  borderTopColor: "#ccc",
                  borderTopWidth: 1,
                  borderBottom: "#ccc",
                  // borderBottomWidth: 1,
                  minHeight: 22,
                }}
              >
                <Text style={[styles.valueText, { marginLeft: 3 }]}>
                  ICD10Code
                </Text>
              </View>
              <View
                style={{
                  borderTopColor: "#ccc",
                  borderTopWidth: 1,
                  borderBottom: "#ccc",
                  // borderBottomWidth: 1,
                  minHeight: 22,
                }}
              >
                <Text style={[styles.valueText, { marginLeft: 3 }]}>
                  ICD10Code
                </Text>
              </View>
            </View>
          </View>

          {/* second column */}
          <View
            style={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={[
                styles.titleHeadings,
                {
                  paddingHorizontal: 2,
                  paddingVertical: 4,
                  borderRightColor: "red",
                  borderRightWidth: 1,
                  borderBottomColor: "red",
                  borderBottomStyle: "dotted",
                  borderBottomWidth: 2,
                  borderTopColor: "red",
                  borderTopStyle: "dotted",
                  borderTopWidth: 2,
                },
              ]}
            >
              <Text style={{ textAlign: "center" }}>BILLING INFORMATION</Text>
            </View>

            {/* second col second row flex divider */}
            <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  borderRightColor: "#ccc",
                  borderRightWidth: 1,
                }}
              >
                <View
                  style={{
                    borderTopColor: "#ccc",
                    borderTopWidth: 1,
                    borderBottom: "#ccc",
                    borderBottomWidth: 1,
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    paddingLeft: 3,
                  }}
                >
                  <View style={styles.rectangle}></View>
                  <Text style={[styles.valueText, { marginLeft: 3 }]}>
                    ICD10Code
                  </Text>
                </View>{" "}
                <View
                  style={{
                    // borderTopColor: "#ccc",
                    // borderTopWidth: 1,
                    minHeight: 22,

                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    marginLeft: 3,
                  }}
                >
                  <View style={styles.rectangle}></View>
                  <Text style={[styles.valueText, { marginLeft: 3 }]}>
                    Self-Pay
                  </Text>
                </View>{" "}
                <View
                  style={{
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                ></View>{" "}
                <View
                  style={{
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.valueText, { marginLeft: 3 }]}>
                    Patient Signature
                  </Text>
                </View>{" "}
                <View
                  style={{
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.valueText, { marginLeft: 3 }]}></Text>
                </View>{" "}
                <View
                  style={{
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    marginLeft: 3,
                  }}
                >
                  <View style={styles.rectangle}></View>
                  <Text style={[styles.valueText, { marginLeft: 3 }]}>
                    Client Bill
                  </Text>
                </View>{" "}
              </View>
              <View
                style={{
                  flex: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  borderRightColor: "red",
                  borderRightWidth: 1,
                }}
              >
                <View
                  style={{
                    borderTopColor: "#ccc",
                    borderTopWidth: 1,
                    borderBottom: "#ccc",
                    borderBottomWidth: 1,
                    minHeight: 22,
                    borderLeftWidth: 1,
                    borderLeftColor: "#ccc",
                  }}
                >
                  <Text style={[styles.valueText, { marginLeft: 3 }]}>
                    Provide a copy of both sides of insurance card/s
                  </Text>
                </View>

                <View
                  style={{
                    borderTopColor: "#ccc",
                    borderTopWidth: 1,
                    borderBottom: "#ccc",
                    borderBottomWidth: 1,
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    borderLeftWidth: 1,
                    borderLeftColor: "#ccc",
                  }}
                >
                  <Text style={[styles.valueText, { marginLeft: 3 }]}>
                    Credit Cart Number:
                  </Text>
                  <Text style={[styles.valueText, { marginLeft: 3 }]}>
                    10923810923
                  </Text>
                </View>
                <View
                  style={{
                    borderTopColor: "#ccc",
                    borderTopWidth: 1,
                    borderBottom: "#ccc",
                    borderBottomWidth: 1,
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    borderLeftWidth: 1,
                    borderLeftColor: "#ccc",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      gap: 3,
                      borderRightWidth: 1,
                      borderRightColor: "#ccc",
                      flexDirection: "row",
                      flex: 2,
                    }}
                  >
                    <Text style={[styles.labelText, { marginLeft: 3 }]}>
                      Exp. Date
                    </Text>
                    <Text style={[styles.valueText, { marginLeft: 3 }]}>
                      12-12-2025
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      gap: 3,
                      borderRightWidth: 1,
                      borderRightColor: "#ccc",
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <Text style={[styles.labelText, { marginLeft: 3 }]}>
                      CV#
                    </Text>
                    <Text style={[styles.valueText, { marginLeft: 3 }]}>
                      1234
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      gap: 2,
                      flexDirection: "row",
                      flex: 2,
                    }}
                  >
                    <Text style={[styles.labelText, { marginLeft: 3 }]}>
                      Amount:
                    </Text>
                    <Text style={[styles.valueText, { marginLeft: 3 }]}>
                      12342
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    borderTopColor: "#ccc",
                    borderTopWidth: 1,
                    borderBottom: "#ccc",
                    borderBottomWidth: 1,
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    borderLeftWidth: 1,
                    borderLeftColor: "#ccc",
                  }}
                ></View>

                <View
                  style={{
                    borderTopColor: "#ccc",
                    borderTopWidth: 1,
                    borderBottom: "#ccc",
                    borderBottomWidth: 1,
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    borderLeftWidth: 1,
                    borderLeftColor: "#ccc",
                  }}
                >
                  <Text style={[styles.labelText, { fontSize: 7 }]}>
                    By signing above, I understand that I am responsible for the
                    cost of the HART test/s ordered, and I authorize payment on
                    the credit card information provided.
                  </Text>
                </View>

                <View
                  style={{
                    borderTopColor: "#ccc",
                    borderTopWidth: 1,
                    minHeight: 22,
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    borderLeftWidth: 1,
                    borderLeftColor: "#ccc",
                  }}
                >
                  <Text style={[styles.labelText]}>Client Name:</Text>
                  <Text style={[styles.valueText]}>John Cena</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Test/s requested title */}
        <View
          style={[
            styles.titleHeadings,
            {
              borderBottomColor: "red",
              borderBottomWidth: 2,
              borderBottomStyle: "dotted",
              borderLeftColor: "red",
              borderLeftWidth: 2,
              borderLeftStyle: "dotted",
              borderRightColor: "red",
              borderRightWidth: 2,
              borderRightStyle: "dotted",
            },
          ]}
        >
          <Text style={{ textAlign: "center" }}>TEST/S REQUESTED</Text>
        </View>

        {/* hart cve text */}
        <View
          style={{
            borderRightColor: "red",
            borderRightWidth: 1,
            borderLeftColor: "red",
            borderLeftWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 3,
            borderBottomColor: "red",
            borderBottomStyle: "dotted",
            borderBottomWidth: 2,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              marginBottom: 3,
            }}
          >
            <View style={styles.rectangle}></View>
            <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 9 }}>HART CVE</Text>
              <Text style={[styles.smallText, { fontWeight: "bold" }]}>
                (0309U)
              </Text>
              <Text style={[styles.smallText, { flex: 1 }]}>
                - is an immunoassay analysis of four proteins (NT-proBNP,
                osteopontin, tissue inhibitor of metalloproteinase-1 [TIMP-1],
                kidney injury molecule-1 [KIM-1]) in a machine learning,
                artificial intelligence (AI)-based algorithm for assessing a
                one-year risk of heart attack, stroke, or cardiovascular death
                (major cardiac event)
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              marginBottom: 2,
            }}
          >
            <View style={styles.rectangle}></View>
            <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 9 }}>HART CVE</Text>
              <Text style={[styles.smallText, { fontWeight: "bold" }]}>
                (0309U)
              </Text>
              <Text style={[styles.smallText, { flex: 1 }]}>
                - is an immunoassay analysis of four proteins (NT-proBNP,
                osteopontin, tissue inhibitor of metalloproteinase-1 [TIMP-1],
                kidney injury molecule-1 [KIM-1]) in a machine learning,
                artificial intelligence (AI)-based algorithm for assessing a
                one-year risk of heart attack, stroke, or cardiovascular death
                (major cardiac event)
              </Text>
            </View>
          </View>
        </View>

        {/* ORDERING PROVIDER TITLE */}
        <View
          style={[
            styles.titleHeadings,
            {
              borderBottomColor: "red",
              borderBottomWidth: 2,
              borderBottomStyle: "dotted",
              borderLeftColor: "red",
              borderLeftWidth: 2,
              borderLeftStyle: "dotted",
              borderRightColor: "red",
              borderRightWidth: 2,
              borderRightStyle: "dotted",
            },
          ]}
        >
          <Text style={{ textAlign: "center" }}>ORDERING PROVIDER</Text>
        </View>

        <View
          style={{
            borderTopColor: "#ccc",
            borderTopWidth: 1,
            borderBottom: "#ccc",
            borderBottomWidth: 1,
            minHeight: 24,
            display: "flex",
            flexDirection: "row",
            borderLeftWidth: 1,
            borderLeftColor: "red",
            borderRightColor: "red",
            borderRightWidth: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 3,
              borderRightWidth: 1,
              borderRightColor: "#ccc",
              flexDirection: "row",
              flex: 2,
              paddingTop: 2,
            }}
          >
            <Text style={[styles.labelText, { marginLeft: 3 }]}>
              Provider's Name
            </Text>
            <Text style={[styles.valueText, { marginLeft: 3 }]}>John Cena</Text>
          </View>
          <View
            style={{
              display: "flex",
              gap: 3,
              borderRightWidth: 1,
              borderRightColor: "#ccc",
              flexDirection: "row",
              flex: 2,
              paddingTop: 2,
            }}
          >
            <Text style={[styles.labelText, { marginLeft: 3 }]}>NP#</Text>
            <Text style={[styles.valueText, { marginLeft: 3 }]}>1234</Text>
          </View>

          <View
            style={{
              display: "flex",
              gap: 2,
              flexDirection: "row",
              flex: 1,
              paddingTop: 2,
            }}
          >
            <Text style={[styles.labelText, { marginLeft: 3 }]}>Date:</Text>
            <Text style={[styles.valueText, { marginLeft: 3 }]}>
              12-12-2025
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 2,
            minHeight: 24,
            display: "flex",
            flexDirection: "row",
            borderLeftWidth: 1,
            borderLeftColor: "red",
            borderRightColor: "red",
            borderRightWidth: 1,
            borderBottomColor: "red",
            borderBottomStyle: "dotted",
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 3,
              borderRightWidth: 1,
              borderRightColor: "#ccc",
              flexDirection: "row",
              flex: 1,
              paddingTop: 1,
            }}
          >
            <Text style={[styles.labelText, { marginLeft: 3 }]}>
              Provider's Signature
            </Text>
            <Text style={[styles.valueText, { marginLeft: 3 }]}>signed </Text>
          </View>
          <View
            style={{
              display: "flex",
              gap: 3,
              flexDirection: "row",
              flex: 1,
              paddingTop: 1,
            }}
          >
            <Text style={[styles.labelText, { padding: 3, fontSize: 7 }]}>
              I am a licensed medical professional. I acknowledge that the
              test/s requested are medically necessary, and documentation of
              medical necessity is documented in the patient's medical records,
              which will be made available upon request of the performing
              laboratory
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.titleHeadings,
            {
              borderBottomColor: "red",
              borderBottomWidth: 2,
              borderBottomStyle: "dotted",
              borderLeftColor: "red",
              borderLeftWidth: 2,
              borderLeftStyle: "dotted",
              borderRightColor: "red",
              borderRightWidth: 2,
              borderRightStyle: "dotted",
            },
          ]}
        >
          <Text style={{ textAlign: "center" }}>BLOOD DRAW INFORMATION</Text>
        </View>

        <View
          style={{
            borderTopColor: "#ccc",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            minHeight: 24,
            display: "flex",
            flexDirection: "row",
            borderLeftWidth: 1,
            borderLeftColor: "red",
            borderRightColor: "red",
            borderRightWidth: 1,
            borderBottomColor: "red",
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 3,
              borderRightWidth: 1,
              borderRightColor: "#ccc",
              flexDirection: "row",
              flex: 1,
              paddingTop: 1,
            }}
          >
            <Text style={[styles.labelText, { marginLeft: 3 }]}>
              Data Sample Collected:
            </Text>
            <Text style={[styles.valueText, { marginLeft: 3 }]}>Yes </Text>
          </View>
          <View
            style={{
              display: "flex",
              gap: 3,
              flexDirection: "row",
              flex: 1,
              paddingTop: 1,
            }}
          >
            <Text style={[styles.labelText, { padding: 3 }]}>
              Phlebotomist Name
            </Text>{" "}
            <Text style={[styles.valueText, { padding: 3 }]}>John Doe</Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              gap: 3,
            }}
          >
            <View
              style={{
                paddingRight: 3,
              }}
            >
              <Text style={{ fontSize: 13 }}>Logo text</Text>
            </View>
            <View
              style={{
                fontSize: 7,
                borderLeftWidth: 2,
                borderLeftColor: "#ccc",
                paddingLeft: 4,
              }}
            >
              <Text>1448S.Rolling Rd. Ste.218</Text>
              <Text>Halethorpe, MD 21227</Text>
              <Text>CLIA# 21D2304851</Text>
              <Text>PI# 1750119814</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
              gap: 3,
            }}
          >
            <View
              style={{
                paddingRight: 3,
              }}
            >
              <Text style={{ fontSize: 13 }}>Rigth Logo</Text>
            </View>
            <View
              style={{
                fontSize: 7,
                borderLeftWidth: 2,
                borderLeftColor: "#ccc",
                paddingLeft: 4,
              }}
            >
              <Text>1448S.Rolling Rd. Ste.218</Text>
              <Text>Halethorpe, MD 21227</Text>
              <Text>CLIA# 21D2304851</Text>
              <Text>PI# 1750119814</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
