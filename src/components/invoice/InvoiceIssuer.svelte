<script>
  import { INVOICE } from "constants";
</script>

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
