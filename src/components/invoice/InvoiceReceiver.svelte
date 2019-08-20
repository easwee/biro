<script>
  import { clientData } from "store";
</script>

<style>
  address {
    float: left;
    width: 50%;
    clear: both;
    padding-top: 15px;
    margin-bottom: 30px;
  }
</style>

<address>
  {$clientData.client_company_name}
  <br />
  {$clientData.client_company_address}
  <br />
  {$clientData.client_company_city}, {$clientData.client_company_zip}
  <br />
  {$clientData.client_company_country}
</address>
