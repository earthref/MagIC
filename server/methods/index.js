import CommonMethods from "./common";
import MagICMethods from "./magic";
import ElasticSearchMethods from "./es";
import S3SearchMethods from "./s3";
import GeologicUnitsMethods from "./geologic_units";

export default function () {
  CommonMethods();
  MagICMethods();
  ElasticSearchMethods();
  S3SearchMethods();
  GeologicUnitsMethods();
}
