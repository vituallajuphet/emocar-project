

<div id="print_trust_receipt" style="font-size:14px;display:none;">
    
    <div class="top_area_print">
        <div class="cont_logo" style="text-align: center;">
            <img src="<?= base_url("assets/images/comp_logo.png"); ?>" style="max-width:460px;width:100%;" alt="logo">
            <h3 style="font-style:italic;font-size:24px;">Trust Receipt Agreement</h3>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:25px;">
            <div>
                <div>
                    <div>Date Issued: <span class="prDate">xxx</span></div>
                    <div>Trust Receipt Form No: <span class="prTreceipt">xxxx</span></div>
                </div>

                <div style="line-height:110%;">
                    <div class="prName" style='text-transform:uppercase;margin-top:17px;'>xxxxx</div>
                    <div style="margin-top: 4px;">c/o LTO-MVIS</div>
                    <div class="prLocation">xxxxxx</div>
                </div>

                <!-- <div class="prDearName" style="margin-top:17px;">xxxxx</div> -->
            </div>
            <div></div>
        </div>

        <div style='text-align:left;margin-top:25px;'>
            <span style="display:inline-block;margin-left:60px;">Received in TRUST from </span> <strong style="font-style:italic;">EMOCAR INSURANCE BROKERAGE</strong> from the following insurance policy per order of the indersigned <strong>ENTRUSTEE</strong>.
        </div>

        <!-- start ang laay -->
        <div>
            <table style="width:100%;margin-top:20px;font-size:13px;">
                <thead>
                    <tr style="font-weight:bold;text-align:left;text-transform:uppercase;font-size:11px">
                        <th style="width: 40%;">Description</th>
                        <th style="width: 30%;text-align: center;">Series Number/s</th>
                        <th style="width: 30%;text-align: center;">Quantity</th>
                    </tr>
                </thead>
                <tbody class="tbody_trustReceipt" style="font-size:12px;"></tbody>
            </table>
        </div>
        <div>
             
            <div style='text-align:right;margin:10px 0 20px'>
                <span style="display: inline-block;width: 230px;text-align: left;">DUE DATE <strong>TBA</strong></span>
                <br>
                <span style="display: inline-block;width: 230px;text-align: left;" class="print_due_date"></span>
            </div>
            <div class="font-size:10px">
                <span style='margin-left:60px;'>Undersigned</span> ENTRUSTEE hereby agrees, undertakes and commits to hold in trust for <span style="font-style:italic;text-transform:uppercase">Emocar Insurance Brokerage</span> the above POLICY, to dispose of or sell them for cash and receive the proceeds thereof in trust for <span style="font-style:italic;text-transform:uppercase">Emocar Insurance Brokerage</span>, to turn over and remit the proceeds of the sale of the policy to the ENTRUSTER, or to return the POLICY in the event of the non-sale on or before the above due date or upon demand of the ENTRUSTER. <span style="font-style:italic;text-transform:uppercase">Emocar Insurance Brokerage</span> may cancel this trust receipt agreement and take possesion of the above POLICY or of the proceeds realized there from any time upon default or failure of the undersigned ENTRUSTEE to comply with any of the terms and conditions of this trust receipt agreement. It is however, understood that should there be policies remaining unsold the ENTRUSTEE may at his option, extend in writing the operation of this trust receipt agreement to another date under the same terms and conditions. Any court action arising from this agreement, the same shall be bought in the proper court of competent jurisdiction within Cebu City.
            </div>
        </div>
        <!-- end ang laay -->

        <div style='margin:35px 0 0;display:flex;align-items:top;justify-content:space-between;'>
            <div>
                <div style="margin-top:15px">Prepared By:</div>
                <div style="margin-top:3px;margin-left: 100px;width: 200px;">Annabelle B. Torino</div>
                <div style="margin-top:40px">Approved By:</div>
                <div style="margin-top:3px;margin-left: 100px;width: 200px;">Felix R. Secuya</div>
            </div>
            <div style="margin:90px 200px 0;">
                <div style="margin-top:23px">Received By:</div>
                <div style="margin-top:3px;margin-left: 100px;width: 200px;" class="receive_print">Juphet Vitualla</div>
            </div>
        </div>    
    </div>

    <div id="print_bottom_part" style='position:fixed;bottom:65px;left:0;width:100%;text-align:center'>
        <!-- Main Office: Rm.: 308 Colon Development Corporation (formerly Gorones Bldg.) Osmeña Blvd., Cebu City
        <div style="display:flex;justify-content:center;margin-top:15px">
            <div style="display:flex;justify-content:flex-start;align-items:center;margin-right:30px">
                <img src="<?= base_url("assets/images/callIcon.jpg")?>" alt="phone icon">
                <span style="margin-left:10px">(03-416-3033)</span>
            </div>
            <div style="display:flex;justify-content:flex-start;align-items:center;margin-right:30px">
                <img src="<?= base_url("assets/images/phoneIcon.jpg")?>" alt="phone icon">
                <span style="margin-left:10px">+63 915 905 9550</span>
            </div>
            <div style="display:flex;justify-content:flex-start;align-items:center;margin-right:30px">
                <img src="<?= base_url("assets/images/emailIcon.jpg")?>" alt="phone icon">
                <span style="margin-left:10px;font-style:italic;">emocarinsurancebrokerage@gmail.com</span>
            </div>
        </div> -->
        <figure style="text-align:center;">
            <img style="display:block;width:100%;" src="<?= base_url("assets/images/print_footer.jpg")?>" alt="footer info">
        </figure>
    </div>
</div>
