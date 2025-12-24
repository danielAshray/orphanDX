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

    backgroundColor: "red",
  },
  titleHeadings: {
    backgroundColor: "#e0e0e0",
    fontSize: 9,
    fontWeight: "bold",
    color: "black",
  },

  labelText: {
    fontSize: 8,
    color: "#999",
  },
  valueText: {
    fontSize: 8,
    color: "black",
  },

  rectangle: {
    height: 9,
    width: 9,
    borderColor: "#ccc",
    borderWidth: 1,
  },

  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  redText: {
    color: "red",
    fontSize: 8,
    fontWeight: "bold",
  },

  singleContainer: {
    paddingVertical: 6,
  },

  smallText: {
    fontSize: 8,
    color: "black",
  },
});

export default function OwlLiverPdf() {
  return (
    <Document>
      <Page style={styles.page}>
        {/* PATIENT + PROVIDER TITLE BAR */}

        <View
          style={{
            display: "flex",
            gap: 4,
            color: "white",
            flexDirection: "row",
            marginBottom:1
          }}
        >
          {/* first logo column */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#0f1c45",
              paddingTop: 3,
              paddingBottom: 1,
              minHeight: 20,
              flex: 1,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14 }}>Left Logo</Text>
            </View>
            {/* middle section */}
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                flex: 2,
                gap: 2,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
                >
                  OWLiver Testing
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#e9ebf0", fontSize: 8 }}>
                  LABORATORY SERVICES REQUEST FORM
                </Text>
              </View>
            </View>
            {/* right section */}
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <View>
                <Text style={{ fontSize: 14 }}>Right Logo</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              minHeight: 20,
              borderWidth: 1,
              borderColor: "black",
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              width: 70,
              paddingHorizontal:8
            }}
          >
            <Text style={{ color: "#999", fontSize: 9, textAlign:"center" }}>
              {" "}
              Accession Label Here
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            backgroundColor: "#ccc",
            fontWeight: "bold",
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            // paddingVertical: 3
            borderRightColor: "#ccc",
            borderRightWidth: 1,
          }}
        >
          <View
            style={[
              styles.titleHeadings,
              {
                flex: 1,
                paddingVertical: 4,
                borderRightColor: "#ccc",
                borderRightWidth: 1,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
              },
            ]}
          >
            <Text style={{ paddingHorizontal: 2 }}>PATIENT INFORMATION</Text>
          </View>
          <View
            style={[
              styles.titleHeadings,
              {
                flex: 1,
                paddingVertical: 4,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
              },
            ]}
          >
            <Text style={{ paddingHorizontal: 2 }}>PROVIDER INFORMATION</Text>
          </View>
        </View>

        {/* left column */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#ccc",
            }}
          >
            {/* patient name and social security number */}
            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                },
              ]}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRight: 1,
                  borderRightColor: "#ccc",
                  //   borderTop: 1,
                  borderTopColor: "#ccc",
                  paddingHorizontal: 1,
                  paddingVertical: 3,
                  flex: 1,
                }}
              >
                <Text
                  style={[
                    styles.redText,
                    {
                      color: "red",
                      paddingHorizontal: 2,
                      marginBottom: 1,
                    },
                  ]}
                >
                  Patient Name (Last / First / Mi)
                </Text>
                <Text style={[styles.valueText, { paddingHorizontal: 2 }]}>
                  John Cena
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  paddingHorizontal: 1,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={[
                    styles.labelText,
                    {
                      color: "#999",
                      fontSize: 10,
                      marginBottom: 1,
                      paddingHorizontal: 2,
                    },
                  ]}
                >
                  Social Security Number
                </Text>
                <Text style={[styles.valueText, { paddingHorizontal: 2 }]}>
                  129043812039
                </Text>
              </View>
            </View>

            {/* dob outer div */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                // paddingVertical: 3,
                // justifyContent: "space-between",
                width: "100%",
                borderBottom: 1,
                borderBottomColor: "#ccc",
              }}
            >
              {/* DOB div */}
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  borderRight: 1,
                  borderRightColor: "#ccc",
                  borderTop: 1,
                  borderTopColor: "#ccc",
                  paddingHorizontal: 1,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={[
                    styles.redText,
                    {
                      marginBottom: 1,
                      paddingHorizontal: 2,
                    },
                  ]}
                >
                  Date of Birth (MMM / DD / YYYY)
                </Text>
                <Text style={[styles.valueText, { paddingHorizontal: 2 }]}>
                  1960/09/23
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  borderTop: 1,
                  borderTopColor: "#ccc",
                  paddingHorizontal: 1,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={[
                    styles.labelText,
                    {
                      marginBottom: 1,
                      paddingHorizontal: 2,
                    },
                  ]}
                >
                  Sex at Birth
                </Text>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  {" "}
                  <View
                    style={[styles.flexRow, { gap: 2, paddingHorizontal: 2 }]}
                  >
                    <View style={styles.rectangle}></View>
                    <Text style={[styles.labelText]}>Male</Text>
                  </View>
                  <View style={[styles.flexRow, { gap: 2 }]}>
                    <View style={styles.rectangle}></View>
                    <Text style={styles.labelText}>Female</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* outer view patient street address*/}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                borderBottom: 1,
                borderBottomColor: "#ccc",
                flexWrap: "wrap",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  paddingHorizontal: 1,
                  paddingVertical: 3,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={[
                    styles.labelText,
                    {
                      marginBottom: 1,
                      paddingHorizontal: 2,
                    },
                  ]}
                >
                  Patient Street Address
                </Text>
                <Text style={[styles.valueText, { paddingHorizontal: 2 }]}>
                  Kathmandu
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                borderBottom: 1,
                borderBottomColor: "#ccc",
                flexWrap: "wrap",
              }}
            >
              {/* inner view */}

              <View
                style={[
                  styles.flexRow,
                  {
                    display: "flex",
                    flex: 1,
                    paddingHorizontal: 2,
                    paddingVertical: 3,
                    gap: 3,
                    flexWrap: "wrap",
                  },
                ]}
              >
                <Text style={[styles.labelText]}>Race:</Text>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Asian</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Black</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Caucasian</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Hispanic</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}> Native American</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Other</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>N/A</Text>
                </View>
              </View>

              <View
                style={[
                  styles.flexRow,
                  {
                    display: "flex",
                    flex: 1,
                    paddingHorizontal: 1,
                    paddingVertical: 3,
                    gap: 3,
                    flexWrap: "wrap",
                  },
                ]}
              >
                <Text style={[styles.labelText]}>Ethnicity:</Text>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Hispanic</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Non-hispanic</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>N/A</Text>
                </View>
              </View>
            </View>

            {/* outer view . state city zip*/}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 3,
                // justifyContent: "space-between",
                width: "100%",
                borderBottom: 1,
                borderBottomColor: "#ccc",
              }}
            >
              {/* inner view */}
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",

                  paddingHorizontal: 2,
                }}
              >
                <Text style={styles.labelText}>City / State / Zip</Text>
                <Text style={[styles.valueText, {}]}>Kathmandu</Text>
              </View>
            </View>

            {/* outer div phone email */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  borderRight: 1,
                  borderRightColor: "#ccc",
                  //   borderTop: 1,
                  borderTopColor: "#ccc",
                  paddingHorizontal: 2,
                  paddingVertical: 3,
                }}
              >
                <Text style={styles.labelText}>Phone</Text>
                <Text style={styles.valueText}>123182309123</Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  paddingVertical: 3,
                  paddingHorizontal: 2,
                }}
              >
                <Text style={styles.labelText}>Email</Text>
                <Text style={[styles.valueText]}>john@cena.com</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, borderRight: 1, borderRightColor: "#ccc" }}>
            <Text>Blank space</Text>
          </View>
        </View>

        {/* bmi weight height */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            width: "100%",
            borderRight: 1,
            borderRightColor: "#ccc",
            borderLeft: 1,
            borderLeftColor: "#ccc",
          }}
        >
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              borderRight: 1,
              borderRightColor: "#ccc",
              paddingHorizontal: 2,
              paddingVertical: 3,
              gap: 3,
            }}
          >
            <Text style={[styles.redText, { marginBottom: 1 }]}>BMI*:</Text>
            <Text style={styles.valueText}> 30 </Text>
          </View>

          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              borderTop: 1,
              borderTopColor: "#ccc",
              paddingHorizontal: 2,
              paddingVertical: 3,
              gap: 3,
            }}
          >
            <Text style={[styles.redText, { marginBottom: 1 }]}>Height*:</Text>
            <Text style={styles.valueText}>6'</Text>
          </View>

          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              borderTop: 1,
              borderTopColor: "#ccc",
              paddingHorizontal: 2,
              paddingVertical: 3,
              borderLeft: 1,
              borderLeftColor: "#ccc",
              gap: 3,
            }}
          >
            <Text style={[styles.redText, { marginBottom: 1 }]}>Weight*:</Text>
            <Text style={styles.valueText}>75kg</Text>
          </View>
        </View>

        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
              width: "100%",
              borderRight: 1,
              borderRightColor: "#ccc",
              borderLeft: 1,
              borderLeftColor: "#ccc",
              fontSize: 9,
              borderTopColor: "#ccc",
              borderTopWidth: 1,
              justifyContent: "center",
              paddingVertical: 2,
            },
          ]}
        >
          <Text
            style={[
              styles.redText,
              { fontStyle: "italic", fontSize: 7, fontWeight: "bold" },
            ]}
          >
            {" "}
            *BMI (OR HEIGHT & WEIGHT) and FASTING CONDITIONS REQUIRED TO RUN THE
            TEST
          </Text>
        </View>

        {/* Insurance information title */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            backgroundColor: "#ccc",
            fontWeight: "bold",
          }}
        >
          <View
            style={[
              styles.titleHeadings,
              {
                flex: 1,
                paddingVertical: 3,
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "flex-end",
              },
            ]}
          >
            <Text style={{ paddingHorizontal: 2 }}>INSURANCE INFORMATION</Text>
            <Text style={{ fontSize: 10, fontWeight: 15 }}>
              {" "}
              (attach demo and front/back of card)
            </Text>
          </View>
        </View>

        {/* insurance content section (new column) */}
        <View>
          <View
            style={[
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderRightWidth: 1,
                borderRightColor: "#ccc",
                borderLeftWidth: 1,
                borderLeftColor: "#ccc",
              },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderRight: 1,
                borderRightColor: "#ccc",
                //   borderTop: 1,
                borderTopColor: "#ccc",
                paddingHorizontal: 1,
                paddingVertical: 3,
                flex: 2,
                alignContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <View
                style={[
                  styles.flexRow,
                  { flex: 2, gap: 6, alignItems: "center", flexWrap: "wrap" },
                ]}
              >
                <Text style={[styles.labelText]}>Bill to:</Text>

                <View
                  style={[styles.flexRow, { gap: 2, alignContent: "center" }]}
                >
                  <View style={[styles.rectangle]}></View>
                  <Text style={[styles.labelText]}>Insurance</Text>
                </View>

                <View
                  style={[styles.flexRow, { gap: 2, alignContent: "center" }]}
                >
                  <View style={[styles.rectangle]}></View>
                  <Text style={[styles.labelText]}>Self-Pay</Text>
                </View>

                <View
                  style={[styles.flexRow, { gap: 2, alignContent: "center" }]}
                >
                  <View style={[styles.rectangle]}></View>
                  <Text style={[styles.labelText]}>Client Bill</Text>
                </View>

                <View
                  style={[styles.flexRow, { gap: 2, alignContent: "center" }]}
                >
                  <View style={[styles.rectangle]}></View>
                  <Text style={[styles.labelText]}>W/C</Text>
                </View>
              </View>

              <View style={[styles.flexRow, { flex: 1, alignItems: "center" }]}>
                <Text style={[styles.labelText]}>Case#:</Text>
              </View>

              <View style={[styles.flexRow, { flex: 1, alignItems: "center" }]}>
                <Text style={[styles.labelText]}>DIO::</Text>
              </View>
            </View>

            <View
              style={[
                styles.flexRow,
                {
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 3,
                },
              ]}
            >
              <View>
                {" "}
                <Text style={styles.labelText}>Relationship to Subscriber</Text>
              </View>
              <View
                style={[
                  styles.flexRow,
                  { flexWrap: "wrap", paddingLeft: 5, gap: 4 },
                ]}
              >
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}> Self</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Spouse</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>Dependent</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderTopWidth: 1,
                borderTopColor: "#ccc",
                borderLeftWidth: 1,
                borderLeftColor: "#ccc",
                borderRightColor: "#ccc",
                borderRightWidth: 1,
              },
            ]}
          >
            <View
              style={[
                styles.flexRow,
                {
                  alignItems: "flex-start",
                  flex: 1,
                  paddingVertical: 3,
                  borderRightColor: "#ccc",
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.labelText]}>
                Patient’s Insurance Provider:{" "}
              </Text>
              <Text style={[styles.valueText]}>Medicare</Text>
            </View>
            <View
              style={[
                styles.flexRow,
                {
                  alignItems: "flex-start",
                  flex: 1,
                  paddingVertical: 3,
                  borderRightColor: "#ccc",
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.labelText]}>Subscriber Name:</Text>
              <Text style={[styles.valueText, { paddingHorizontal: 2 }]}>
                Randy Orton
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                paddingHorizontal: 1,
                paddingVertical: 3,
                alignItems: "center",
              }}
            >
              <Text style={[styles.labelText]}>Subscriber Date of Birth:</Text>
              <Text style={[styles.valueText, { paddingHorizontal: 2 }]}>
                1970-10-12
              </Text>
            </View>
            z
          </View>
        </View>

        {/* insurance add and city */}
        <View
          style={[
            styles.flexRow,
            { width: "100%", borderTopColor: "#ccc", borderTopWidth: 1 },
          ]}
        >
          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                paddingVertical: 6,
                alignItems: "flex-start",
                borderRight: 1,
                borderRightColor: "#ccc",
              },
            ]}
          >
            <Text style={[styles.labelText]}>
              Patient’s Insurance Provider:{" "}
            </Text>
            <Text style={[styles.valueText]}>Medicare</Text>
          </View>

          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                borderRightColor: "#ccc",
                borderRightWidth: 1,
                paddingVertical: 6,
                gap: 4,
              },
            ]}
          >
            {/* left section */}
            <Text style={[styles.labelText]}>City / State / Zip:</Text>
            <Text style={[styles.valueText]}>Kathmandu</Text>
          </View>
        </View>

        {/* policy and group */}
        <View
          style={[
            styles.flexRow,
            { width: "100%", borderTopColor: "#ccc", borderTopWidth: 1 },
          ]}
        >
          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                paddingVertical: 6,
                alignItems: "flex-start",
                borderRight: 1,
                borderRightColor: "#ccc",
                gap: 4,
              },
            ]}
          >
            <Text style={[styles.labelText]}>Policy#:</Text>
            <Text style={[styles.valueText]}>Policy123</Text>
          </View>

          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                borderRightColor: "#ccc",
                borderRightWidth: 1,
                paddingVertical: 6,
                alignItems: "flex-start",
                gap: 4,
              },
            ]}
          >
            {/* left section */}
            <Text style={[styles.labelText]}>Group#: </Text>
            <Text style={[styles.valueText]}>Group 120</Text>
          </View>
        </View>

        {/* phone and fax */}
        <View
          style={[
            styles.flexRow,
            { width: "100%", borderTopColor: "#ccc", borderTopWidth: 1 },
          ]}
        >
          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                paddingVertical: 6,
                alignItems: "flex-start",
                borderRight: 1,
                borderRightColor: "#ccc",
                gap: 4,
              },
            ]}
          >
            <Text style={[styles.labelText]}>Phone#:</Text>
            <Text style={[styles.valueText]}>123129038</Text>
          </View>

          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                borderRightColor: "#ccc",
                borderRightWidth: 1,
                paddingVertical: 6,
                alignItems: "flex-start",
                gap: 4,
              },
            ]}
          >
            {/* left section */}
            <Text style={[styles.labelText]}>Fax# </Text>
            <Text style={[styles.valueText]}>1230-1293-01</Text>
          </View>
        </View>

        {/* Specimen collection information */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            backgroundColor: "#ccc",
            fontWeight: "bold",
          }}
        >
          <View
            style={[
              styles.titleHeadings,
              {
                flex: 1,
                paddingVertical: 5,
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "flex-end",
              },
            ]}
          >
            <Text style={{ paddingHorizontal: 2 }}>
              SPECIMEN COLLECTION INFORMATION
            </Text>
          </View>
        </View>

        {/* collectors name */}
        <View
          style={[
            styles.flexRow,
            {
              width: "100%",
              borderTopColor: "#ccc",
              borderTopWidth: 1,
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            style={[
              styles.flexRow,
              {
                flex: 2,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                alignItems: "flex-start",
                borderRight: 1,
                borderRightColor: "#ccc",
                gap: 4,
              },
            ]}
          >
            <Text style={[styles.labelText]}>Collector's name:</Text>
            <Text style={[styles.valueText]}>John Cena</Text>
          </View>

          <View
            style={{
              flex: 2,
              borderRightColor: "#ccc",
              borderRightWidth: 1,
            }}
          >
            <View
              style={[
                styles.flexRow,
                {
                  flex: 1,
                  borderRightColor: "#ccc",
                  borderRightWidth: 1,
                  alignItems: "flex-start",
                  flexDirection: "row",
                  marginBottom: 6,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.redText]}>Fasting: </Text>
              </View>
              <View
                style={[
                  styles.flexRow,
                  {
                    justifyContent: "flex-start",
                    flex: 1,
                  },
                ]}
              >
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}> Yes</Text>
                </View>
                <View style={[styles.flexRow, { gap: 2 }]}>
                  <View style={styles.rectangle}></View>
                  <Text style={styles.labelText}>No</Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.flexRow,
                { gap: 3, paddingVertical: 3, marginTop: 2 },
              ]}
            >
              <Text style={styles.redText}>Hours since Last meal</Text>
              <Text style={styles.valueText}>6</Text>
            </View>
          </View>

          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                gap: 3,
                display: "flex",
                flexWrap: "wrap",
                borderRightColor: "#ccc",
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={styles.labelText}>Date Collected</Text>
            <Text style={styles.valueText}>12-12-2025</Text>
          </View>

          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                gap: 3,
                display: "flex",
                flexWrap: "wrap",
                borderRightColor: "#ccc",
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={styles.labelText}>Time Collected</Text>
            <Text style={styles.valueText}>12:10</Text>
          </View>

          <View
            style={{
              display: "flex",
              gap: 2,
              flexDirection: "row",
              borderRightColor: "#ccc",
              borderRightWidth: 1,
            }}
          >
            <View style={[styles.flexRow, { gap: 2 }]}>
              <View style={styles.rectangle}></View>
              <Text style={styles.labelText}>Yes</Text>
            </View>

            <View style={[styles.flexRow, { gap: 2 }]}>
              <View style={styles.rectangle}></View>
              <Text style={styles.labelText}>No</Text>
            </View>
          </View>
        </View>

        {/* ICD 10 codes title */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ccc",
            fontWeight: "bold",
          }}
        >
          <View
            style={[
              styles.titleHeadings,
              {
                flex: 2,
                paddingVertical: 5,
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "flex-end",
                borderRightColor: "#ccc",
                borderRightWidth: 1,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                paddingHorizontal: 2,
              },
            ]}
          >
            <Text style={{ paddingHorizontal: 2 }}>ICD 10 CODES</Text>
          </View>

          <View
            style={[
              styles.titleHeadings,
              {
                flex: 1,
                paddingVertical: 5,
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#72cadb",
                fontSize: 10,
                justifyContent: "flex-end",
                color: "black",
                borderRightColor: "#ccc",
                borderRightWidth: 1,
                paddingHorizontal: 2.5,
              },
            ]}
          >
            <View
              style={[
                styles.rectangle,
                { borderColor: "black", borderWidth: 2 },
              ]}
            ></View>
            <Text style={{ paddingHorizontal: 2 }}>
              SC0021 OWLiver PROFILE SST x 1
            </Text>
          </View>
        </View>

        {/* ICD 10 codes content */}
        <View style={[styles.flexRow, {}]}>
          {/* first column */}
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                // paddingHorizontal: 2,
                borderLeftColor: "#ccc",
                // borderLeftWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>
          </View>

          {/* Second column */}
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  E78.5
                </Text>
              </View>

              <View style={[{ flex: 1 }]}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                      borderRightColor: "#ccc",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  Hyperlipidemia, unspecified
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                alignItems: "center",
                gap: 10,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                  flex: 1,
                  paddingHorizontal: 1,
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  Other _______
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  flex: 1,
                  alignItems: "center",
                  borderRightColor: "#ccc",
                  borderRightWidth: 1,
                  paddingHorizontal: 1,
                }}
              >
                <View style={[styles.rectangle, { paddingVertical: 3 }]}></View>
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  Other _______
                </Text>
              </View>
            </View>
          </View>

          {/* third column */}
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                fontWeight: "bold",
                minHeight: 18,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      color: "#0f1c45",
                      paddingVertical: 3,
                      paddingHorizontal: 1,
                    },
                  ]}
                >
                  ORDER CODE
                </Text>
              </View>
              <View style={{ justifyContent: "flex-start", flex: 1 }}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      color: "#0f1c45",
                      paddingVertical: 3,
                      paddingHorizontal: 1,
                    },
                  ]}
                >
                  TEST NAME
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderRightColor: "#ccc",
                  borderRightWidth: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 1,
                }}
              >
                {" "}
                <Text
                  style={[
                    styles.smallText,
                    { color: "#0f1c45", paddingVertical: 3 },
                  ]}
                >
                  CPT
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                }}
              >
                <Text
                  style={[
                    styles.smallText,
                    { paddingVertical: 3, borderRightColor: "#ccc" },
                  ]}
                >
                  SC003
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                }}
              >
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  OWLiver
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRightWidth: 1,
                  borderRightColor: "#ccc",
                }}
              >
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                    },
                  ]}
                >
                  0344U
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                }}
              >
                <Text
                  style={[
                    styles.smallText,
                    { paddingVertical: 3, borderRightColor: "#ccc" },
                  ]}
                >
                  SC003
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                }}
              >
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  OWLiver
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRightWidth: 1,
                  borderRightColor: "#ccc",
                }}
              >
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                    },
                  ]}
                >
                  0344U
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                }}
              >
                <Text
                  style={[
                    styles.smallText,
                    { paddingVertical: 3, borderRightColor: "#ccc" },
                  ]}
                >
                  SC003
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                }}
              >
                <Text style={[styles.smallText, { paddingVertical: 3 }]}>
                  OWLiver
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRightWidth: 1,
                  borderRightColor: "#ccc",
                }}
              >
                <Text
                  style={[
                    styles.smallText,
                    {
                      paddingVertical: 3,
                    },
                  ]}
                >
                  0344U
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                minHeight: 18,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRightColor: "#ccc",
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={[
                    styles.smallText,

                    {
                      paddingVertical: 3,
                      fontSize: 7,
                    },
                  ]}
                >
                  *Patient BMI must be provided above to order SC0021
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* consent for testing text */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          {/* first col 2/3 */}
          <View
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 75,
              padding: 3,
              borderLeftWidth: 1,
              borderLeftColor: "#ccc",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              borderRightWidth: 1,
              borderRightColor: "#ccc",
            }}
          >
            {/* upper text */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              <Text style={[styles.redText, { fontSize: 7 }]}>
                CONSENT FOR TESTING:
              </Text>
              <Text style={{ fontSize: 6, flexWrap: "wrap" }}>
                The information I have provided on this form is true and
                accurate. I consent to the collection of a specimen from myself
                or my minor child/ward for the purpose of laboratory testing. In
                consultation with my Medical Provider, I have chosen Luxor
                Scientific, LLC (Luxor) to perform the testing described on this
                form, and to report test results to my Provider or his/her
                facility. I also understand that my specimen remnants and
                clinical information may be shared, without information directly
                identifying me, for medical research purposes with entities who
                are legally bound to comply with applicable laws/regulations
                governing the protection of personally identifiable health
                information. I assign my right to receive payment of benefits
                from my insurer, and to appeal benefit determinations for this
                testing, to Luxor and I request that payment be made on my
                behalf directly to Luxor. If my insurer sends payment for
                testing services directly to me, I will endorse the check and
                forward it to Luxor on
              </Text>
            </View>
            {/* signature */}
            <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[styles.redText, { fontSize: 7 }]}>
                  Patient Signature:
                </Text>
                <Text style={{ fontSize: 7 }}>
                  ______________________________________
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[styles.redText, { fontSize: 7 }]}>Date:</Text>
                <Text style={{ fontSize: 7 }}>
                  __________________________________
                </Text>
              </View>
            </View>
          </View>

          {/* Second column */}
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRightColor: "#ccc",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              borderRightWidth: 1,
              minHeight: 75,
              padding: 3,
            }}
          >
            {/* upper text */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Text style={[styles.redText, { fontSize: 7 }]}>
                MEDICAL NECESSITY:
              </Text>
              <Text style={{ fontSize: 6, flexWrap: "wrap" }}>
                The provider certifies that the requested tests are medically
                necessary, that the medical necessity of requested tests is
                documented in the patient’s chart, and the need for the
                requested tests has been explained to the patient. The provider
                also agrees to provide chart notes or other documentation within
                72 hours when requested by patients and/or insurers. Only tests
                that are medically reasonable and necessary for the diagnosis pr
                treatment of a Medicare or Medicaid patient will be reimbursed.
                The Office of Inspector General takes the position that a
                physician who orders medically unnecessary tests for which M
              </Text>
            </View>
            {/* signature */}
            <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
              <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Text style={[styles.redText, { fontSize: 7 }]}>
                  Provider Signature:
                </Text>
                <Text style={{ fontSize: 7 }}>_________________</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[styles.redText, { fontSize: 7 }]}>Date:</Text>
                <Text style={{ fontSize: 7 }}>_________</Text>
              </View>
            </View>
          </View>
        </View>

        {/*Test combination title  */}
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "red",
            paddingVertical: 1,
            paddingHorizontal: 2,
          }}
        >
          <Text
            style={[
              styles.titleHeadings,
              {
                backgroundColor: "white",
                fontWeight: "bold",
                color: "#0f1c45",
              },
            ]}
          >
            TEST COMBINATION / PANEL POLICY
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginBottom: 4,
          }}
        >
          <View>
            <Text style={[{ fontSize: 6.5 }]}>
              Luxor’s policy is to provide physicians, in each instance, with
              the flexibility to choose appropriate tests to assure that the
              convenience of ordering test combinations/profiles does not
              distance physicians who wish to order test combinations/profiles
              from making deliberate decisions regarding which tests are truly
              medically necessary. All tests offered in test
              combinations/profiles may be ordered individually using the Luxor
              request form. Luxor encourages clients to contact their local
              Luxor representative or Luxor location if the testing
              configurations shown here do not meet individual needs for any
              reason, or if some other combination of procedures is desired.
            </Text>
          </View>
          <View>
            <Text style={[{ fontSize: 6.5 }]}>
              In an effort to keep our clients fully informed of the content,
              charges, and coding of its test combinations/profiles when billed
              to Medicare, we periodically send notices concerning customized
              test combinations/panels, as well as information regarding patient
              fees for all Luxor services. We also welcome the opportunity to
              provide, on request, additional information in connection with our
              testing services and the manner in which they are billed to
              physicians, health care plans, and patients.
            </Text>
          </View>
          <View>
            <Text style={[{ fontSize: 6.5 }]}>
              The CPT code(s) listed are in accordance with the current edition
              of Current Procedural Terminology, a publication of the American
              Medical Association. CPT codes are provided here for the
              convenience of our clients; however, correct coding often varies
              from one carrier to another. Consequently, the codes presented
              here are intended as general guidelines and should not be used
              without confirming with the appropriate payor that their use is
              appropriate in each case. All laboratory procedures will be billed
              to third-party carriers (including Medicare and Medicaid) at fees
              billed to patients and in accordance with the specific CPT coding
              required by the carrier. Microbiology CPT code(s) for additional
              procedures such as susceptibility testing, identification,
              serotyping, etc. will be billed in addition to the primary codes
              with appropriate CPTs. Luxor will process the specimen for a
              microbiology test based on the source
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            color: "white",
            backgroundColor: "#0f1c45",
            paddingVertical: 3,
          }}
        >
          <Text style={{ fontSize: 6, fontWeight: "bold" }}>
            1327 Miller Road • Suite F | Greenville, SC 29607 |
            luxorscientific.org | 864.568.8940
          </Text>
        </View>
      </Page>
    </Document>
  );
}
