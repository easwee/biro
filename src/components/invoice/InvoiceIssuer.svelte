<script>
  import { INVOICE } from "constants";
</script>

<style>
  address {
    width: 50%;
    float: right;
    padding: 0 10px;
    margin-bottom: 15px;
    font-style: normal;
  }
</style>

<address>
  {INVOICE.COMPANY_NAME}
  <br />
  {INVOICE.COMPANY_ADDRESS}
  <br />
  {INVOICE.COMPANY_POSTAL_NUMBER} {INVOICE.COMPANY_CITY},
  <br />
  Tax reg. no.: {INVOICE.COMPANY_TAX_REGISTRATION_NUMBER}
  <br />
  Business reg. no.: {INVOICE.COMPANY_BUSINESS_REGISTRATION_NUMBER}
</address>
