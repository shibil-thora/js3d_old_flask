import firebase_admin
from firebase_admin import credentials, messaging
import sys

def run():
  
    try:
        cred = credentials.Certificate("serviceAccountKey.json")
        firebase_admin.initialize_app(cred)
    except FileNotFoundError:
        print("Error: 'serviceAccountKey.json' not found. Please ensure the service account key file is in the correct path.")
        return
    except Exception as e:
        print(f"Error initializing Firebase app: {e}")
        return

    # registration_tokens = [
    # "deZsKtPPR0-x_Vh0lD7-2n:APA91bHm-4UoxdOKe_wHG-hl6ElHxkB0kG1ZpwKIDg-Ilw9gwujKQ2tbGZldareoOIUR3ecSbirFLceHdams9iQwmxq7SdGAqVk4BWXuPJxGF2BBwahZ4Jo",
    # "ct2Zhw4cRF2bbdRBVQBbgM:APA91bGQAQia-L2irN7qwjR6Oa_w6eQ3mb8AfVV4hYrDta18kqmDTQgQHfH0LqbSnRCdF753EDPJLMNxT-FAL0UdOz6mxdAdKRTNecCvTdixEMr-3whdDuo",
    # "exC9A6F2QCS0_DEi3DRXKH:APA91bEuB1WVEpsIMmOiONpm9zRi6ckRb0lLK6Nt61RE_Sn15enUqbM7qxhqLXqHX-ykhasVKwJ9SUJrB0a0nDLHBQXe4Wugx8IM1InI7Zbqz8ZpKF6KkCs",
    # "dm91BqLaR7ON5YhIDQ5zA7:APA91bH4o5wnsS4xzmMR019xkJ-O91JEXwYdwR9mUw_hlOzyV8F0M5jyMwTKj4yMIs40cWR93gR0S28S4Q1M1cRvf4yk3JKc5Z_IzFvZLo6Q62OtHq88QX4",
    # "e-undFvxe0PIifZ2cx-vYs:APA91bEpAV3Q4msDt1sPRgZ2zPpKcGsR_wz07P09K0J1ElpJE6-N8KbEPNV-u7wXUWu4nFfYkMP-zJKPafG4AsGuU0UfufCMq4uUz9CMkeZ-upplbzHy-B8",
    # "dJ2OjQ_HThyAdjMzWlniVZ:APA91bH_aPUk-tAWe7eF0bdJEzHioPczePi3B6_73fTo8NOqH1SxgsM81b6FX4A5IqsgqAGLuT1B7opkLmLFcRNZkTLyc1WRybfig5-c_ejkt_06IJieVJc",
    # "cX9RnOuJiEiJo0cewpQ_zG:APA91bFWwAeeasG6e8wL-HcDYg-bnTYGTJoAv6hmJnn3JLU8sq2oQvfmHqJcPQOb7FbMIJuwS5MVJoEuMaNHtSBfeSesnYV8LIusvxVUUlYJRBQZCw29IdA",
    # "eU0-yQqtRAqypR6Pbc0uFd:APA91bHJXmExBehjxFr1hDOsnkUG4glmP-aUEcMrE1QkwxsKHJMKNHEYBR5zHAHTdLvI1MjHG5EoPn2EGc30RImjQMybDv4VPXmPpi4b3TDTk0ugPUmO-bE",
    # "eGcP6bhyRG2xCUK2HcqfLZ:APA91bF2kQzaXU5VhAcd6m9DYYIdnv-bTxCm85VZZyWzVEelnecUL_i2NjCkOprsQ4BGrjHu8i25hFGZYDWoBjSOJmb-bZv3r_zLion1k0kaVPOxGpLaRc8",
    # "eXXHJSHvD09wtnz5Hp3hrh:APA91bE7A9RSlQFJlw0vCQpuw5W062-rXFX0qbCqwlGwhy0HjfvME2OboPdDoBxHTIer2uxp6d2FAO2PkJCUiEpLLbFW0QuQP-mc3FhQPmLK0D7sG-rDyHQ",
    # "eEoeygmUTsyo662NXdvzF7:APA91bGMIDb2RyXOlbEZzJPSaecNrM0YyAZDJ6Z8dJXxuhHadDr0AAZ5mOUCV1i_9fJOOZnoj8yyBM5aY3WZ6BgyhyRhVDCd1lD8i0STBMHlycgh4cpPThM",
    # "ei6_cbw2y0buqN_0m5xEyK:APA91bH3GS7FoU7c8YmkScWNAdV8owA9NSA1YcC1553Zfuw_deMSiiJ6dydiz6CvS9GvgfJMvV9IaubA6u8Df-eeypCGhGast0lcynBqkKvkr9SdmrSqrL0",
    # "ena9dTQzRv6uzWBIXBNCsW:APA91bEi5QjBlz_wPrtaNWhTI1G7D4xNXy_CEB7ozuN2-uUdVUlb-CVS_e2wJoZ_5HRzAFVHzmfZ1y2cPrXinBhLgkjreKpYzmkSDL56sPATkcA-VG-baXE",
    # "do_NJUsoTICRzweXG4aNul:APA91bHNP4VbDwrpyRaH-lVv3ZnJTvbZkEcQoaiJRHUeXufZCjtys3O4XzKvAXL99rHOuTsAgIMoCYqOUrvynJFNnLSY8ZZHx-YOGOmwAQJYmDhgHxIebWY",
    # "fzAPlaeQSvqxXQ-WWaT8cp:APA91bGU_zCCN5WYrjpdoZgpzzlRYO66AMhQaQRECZSRh0dOkcmYCX7CQmXcsrEGb9Tsu0NMbi2fs3Ti8KHmw8G-UjSHzkufaAfNTUg5k2iKjNr12AXUgnE",
    # "fg0jyxMIRuazlxZxGxLqoA:APA91bEPmHEpIFZaeNGx3_ZFcFyGu_7E8v7qo3GEVeYrZ85_40Dn54VEc8M-g0Xu--x-uD791el36YlhUqjxIi3utU8whJK6GrEVx-N5U-_IgN8NWGVflts",
    # "dGsstXH0QDCIQjXWWROzGF:APA91bFgAooXBPYbetGV2ZMaqjlC1Jvmt6btC8HPx-VomEEctL2bKlN1KXyy6TxwfRoN39XIzECP_x78ofbf4ApqwchfyXjPbVOXMQk1HElJ-fdO4FzHDBU",
    # "dnNDbQ8xTfW81mA8dMm8_Z:APA91bFaNC5POHYuULRwYBP2v7srBwzpoX3umb5R1nrS0_LQknfMkpv1jWpMd-95OXkwMo6IgMfXLbqyoOZsIoMIMVRF2XjfQZL-GW-sizZgulMGI6BaJHhagPIujNBtJWmFq43JgwtW",
    # "e-RZj-ROTM-BoEvQNMZZRo:APA91bFzjGqfSRPgPetP6z7B8DnEElQObXMxjFBjGKvMTI3sx_5Ypd4zmOLPRL5yzwFDekU21HLHnF6KfeXOlCYNb0tmcjyYaiGjPVxE8CxFtOvs07E_32c",
    # "fz4wuzJoQUituwS2STwnYB:APA91bHAQvH3QHIakkZq64RXyje4a7ktsygXOoG6d14M-NFfFHmXftERt0-B9d8ZR9HV6fTabzh0wZK35PpA9o9vgdUpu-0mw_FTHgQ0_sq7hXMwy4AoOP0",
    # "cKqpdgdERgKboh7002BT5W:APA91bGMw6IGGgV8k33F7g1HL5TKFgk0PG4Fko8lyZqIH6qG3tkS9kxk5AFVrvNET7lWgrnRfwM_4bUvDUYNVaFEeqEMnjXnxVU5mmRQKcDcY4UQR1-pvWw",
    # "dqQMjbBWTTa7ls3vMqkoK4:APA91bFfd7FjZG30NG8EyCmHtCPLm_wc8_lmQ4WIwIicCKKzI6GYBTyojo4jGAQ5Ju1obP2SqvnRdA4dccvGQZLrrNW3BGIKKuEixwBbBwTIOql3vs3Gccs",
    # "cIHK_RKcRP-H5_ew0CaZR9:APA91bGq1zYFu5gse9QUiI2PpyG18SzglR7mcNYLSEF1qtu4-3upxdpnpWQaIXbLEmLXMra_CS1QB8gCjxPvc8r89w4xONTdcp59joqErRNmxQYN874cQpM",
    # "f0Ya897sSD6J7chqn4EmZP:APA91bGXa85Ljwyx5szMTqJvZIQrtd7zS3x16KkEpw9l9ffZpVD1lyHjSf_nHA__fU0JZQc3MZHYz-DWe41sm750n-xpC3I8TYKW13PTO6pHIM07cxktIQY",
    # "fCeu8umyQYarPbhVesWACy:APA91bEGppVfNb7NcfVxoqlnJuLmsv2nCW6UHnYwaprIQNM8E71rdK8nz6iSo_APlBBh09fXnph6LLwLhTF3powJoZuZg4EjvqODGLTsbYrZWe4fNJiD2Nc",
    # "eacn2Za4Rbi-TVoii1uUVD:APA91bHI4N1faubTSuZIZ2BebgEdLyEKbsSv3-lt7BbxGM5vFJM-rf1FBX3eDHD-3CciOVEtOmQ_EDAeC8Fl9Z6Eed-aeltcZUo_DbB_ffaMfIqHGwmXEpw",
    # "d26bdwd-RxmMrRYsB1AJWQ:APA91bGqvSu71vdtwuG0xIlyZ4nLMhRYdK2W2cJbeDIy5g4fHNPoEOa7outxy_bOY4uKDLVNUEXyySfRD_yERVY5WaCD00t92V30GHDLGPq7ev3gJ4EfE1U",
    # "fhKlNWGav0OjkX1m8qy9Fc:APA91bEH1B43BChNfAD5CmzbBv1Spt3qOle9kSd843ect4wQDiQ9PzP4RlxW7iDkcoid4nOxu2j4Nf7aRhc09pE-29UbKU3Yo3PkOYVa40JWjpyhU9ndsi4",
    # "dYo3i1MJSwqSovx8iErxy5:APA91bFKxkxBbcSrY9-aRn5m7eoK_6OJ-0gUgOPI11fRcUbmPuG4ntESOIVCncENRub-HUlajlV7w2m6aGijQ49RwVWynb1ywUWFvZoyTOThi7kmgnBz5Bs",
    # "cFN0KzMFTZ-_EQS56nRDDg:APA91bG9yqtIkmdW72XHvVzqGyXYj2CkqiDTQN_HigBdvt3LI1E3hi4Girh2mYB_2s5n7GXQgw33q3LffMSGscR78eHG0Y96ZmyZOeENNqAqc3FG8SfvmRE",
    # "eWXwm12rToSUZ3yeQ_nJia:APA91bFh007EEMV77oi-hB0Ze9wAE2XLfNE09UlkYX0D7Z5nGhPkAyfqKpjNrQ9K_PIRfFeLWTx5AyDx_bkSrMKjAcTQmOBPt3hPiGyzXfn15OialGO4inE",
    # "cELmpKRUA02MrOrZuoXu56:APA91bHVjyx1LXBiTWoZ9vjeIXDugletnTpYGhj3uY9MlMSsiHG2usAYNxQcnKMir9U8EYnPUbjYmSEOvp4SrtgtuUdD2r3_AA2gBUXcZE8YUb7FWUL0T9w",
    # "fY4_y2QCTXmdRxSM4RgAOr:APA91bEqsyYx6qn_1pMZOexLTyAUs_J9vEaGlEsSDUc7jFBHCy-yn5EsklIQGzkfUKOnRKsK_6Fu-lgvwgkBDkGfD29t27xrC_4f5B-7EWnqwwk7f8NP49I",
    # "dCK5XxAjQHKZAa3HFk--df:APA91bHGBVpp37GWU9Esq8evIaYVvutp-7PxbBcwtfh1zlyqR-jtnC-Sm69pC3aH6JylBjbSBi3ZI8ZBm44KkelabT-YjDuWgy9WM6v7FYGnMjRs2f2ta6U",
    # "eIMfBAUYRv2jYDGymymRTD:APA91bH3ZPZbsU__26OeiWOOlzRAu6cGAJSgqhfIjp5Xwif7has6b3LtMvWHqRp_iP022BhToy_ur-FW8qbOA8lxMXd_161mf0tFd-DOP__mz8cI66638Rw",
    # "evZBRJ98V0RfhUUo7p-Nb8:APA91bGykglvkbMZtu_g_15FSak-D9iSdsyqWX98OXX11R2UKBnMOQ_13pyOCN05RUD3m7jV-3U2sL2V5Ttk-tQw4opwgcLFb6N2qFNm7Q-QToyR7BhNVOE",
    # "eBfBItseRvGfbCrPTIxvNZ:APA91bFFWp5Pj1hQ1F4WzzCUdbtz2fCGQcOWitMvNCQs9eeg9X2O_hCT4W8oKVuSXvJozzVUWfJ1Lkh1VHFM1n_7U55HQiAFzKrOAqxzj4autNAGHPkAqP0",
    # "fTrBiPniXUzJiWxEMMMd5M:APA91bF_xJX-_2F1UkQPAZRo70mEVfC1AA4g8aFaMxGg1y0DRZ1CUVFrWBfKxLatU8i4BhXvI_Zipn2C0Zw5XbZiP8gER3-WlHLHBT5vRqS0pyGQ50IPb_o",
    # "cAlK3fTgRxaGf8vNJi8fJI:APA91bH07AjdZHFU0nLOeMMKzrXsEG1fDWEQtWaFXhxKq-RGMCDZlig2ETgiKKfBwtFteuk45Ib6eoLgx_Dm82U7zTBmYC8taA58vfZ5bHW-CKYnCjTLGy0",
    # "eryMgSWPQQCc5gcm-Hs3Pu:APA91bEngpfr7ClxWnwz-LJgIZY6lCnTYWlj1R8nKl-Z324HSWnihlWzpBvFpgn50pQG_l-FrjKuRZ1RtNdYoqdWSe4qWXn_689XaYhXu8XUwWq5TMy7C18",
    # "fXKv43uzQxCH_5spm5DURU:APA91bEDOeCV2HhKutYCNH5A-gytZAHPylXtxUNCVMVqvQ00aBXwOYMlDRoG6mls7Kqp2W9KWdJc3ABbrj0AGJXmawItJPi6HcJ8fRHw3mq17rbdFBAY9MM"
    # ]

    registration_tokens = [
        'fz4wuzJoQUituwS2STwnYB:APA91bHAQvH3QHIakkZq64RXyje4a7ktsygXOoG6d14M-NFfFHmXftERt0-B9d8ZR9HV6fTabzh0wZK35PpA9o9vgdUpu-0mw_FTHgQ0_sq7hXMwy4AoOP0'
    ]
   
    # Use the argument passed to the script, or a default message
    message_body = sys.argv[-1] if len(sys.argv) > 1 and not sys.argv[-1].endswith(".py") else "TEST: This is an individual push notification."

    # Counters to track results
    success_count = 0
    failure_count = 0

    # 3. Loop through tokens and send individual messages
    print(f"Attempting to send {len(registration_tokens)} individual messages...")
    
    for token in registration_tokens:
        message = messaging.Message(
            notification=messaging.Notification(
                title="Test Notification",
                body=message_body,
            ),
            token=token,
            data={
                "type": "blackdotsReminder",
                "is_test": "true"
            }
        )

        try:
            response = messaging.send(message)
            success_count += 1
            # print(f"  - ✅ Sent to token: {token[:20]}... Response: {response}")
        except Exception as e:
            failure_count += 1
            print(f"  - ❌ Failed to send to token: {token[:20]}... Error: {e}")

    print("\n--- Summary ---")
    print(f"Total tokens processed: {len(registration_tokens)}")
    print(f"✅ Successfully sent: {success_count}")
    print(f"❌ Failed to send: {failure_count}")

if __name__ == '__main__':
    run()