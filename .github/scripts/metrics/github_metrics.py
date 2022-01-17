"""
Submit metrics returns "Payload accepted" response
"""

from datetime import datetime
from datetime import timedelta
from datadog_api_client.v1 import ApiClient, Configuration
from datadog_api_client.v1.api.metrics_api import MetricsApi
from datadog_api_client.v1.model.metrics_payload import MetricsPayload
from datadog_api_client.v1.model.point import Point
from datadog_api_client.v1.model.series import Series
import requests


github_url="https://api.github.com/repos/twilio/twilio-cli/releases"
response = requests.get(github_url)
output=response.json()
rpm_count = deb_count = exe_count = pkg_count = 0

for release in output:
    for platform_exe in release['assets']:
        if(platform_exe['name'][-3:]=="rpm"):
            rpm_count+=platform_exe['download_count']
        elif(platform_exe['name'][-3:]=="deb"):
            deb_count+=platform_exe['download_count']
        elif(platform_exe['name'][-3:]=="exe"):
            exe_count+=platform_exe['download_count']
        elif(platform_exe['name'][-3:]=="pkg"):
            pkg_count+=platform_exe['download_count']

download_count_rmp_float=float(rpm_count)
download_count_deb_float=float(deb_count)
download_count_exe_float=float(exe_count)
download_count_pkg_float=float(pkg_count)


body_rpm = MetricsPayload(
    series=[
        Series(
            metric="twilio_cli.github_rpm_downloads.count",
            type="count",
            points=[Point([datetime.now().timestamp(), download_count_rmp_float])],
            tags=["test:github"],
        )
    ]
)

body_deb = MetricsPayload(
    series=[
        Series(
            metric="twilio_cli.github_deb_downloads.count",
            type="count",
            points=[Point([datetime.now().timestamp(), download_count_deb_float])],
            tags=["test:github"],
        )
    ]
)

body_exe = MetricsPayload(
    series=[
        Series(
            metric="twilio_cli.github_exe_downloads.count",
            type="count",
            points=[Point([datetime.now().timestamp(), download_count_exe_float])],
            tags=["test:github"],
        )
    ]
)

body_pkg = MetricsPayload(
    series=[
        Series(
            metric="twilio_cli.github_pkg_downloads.count",
            type="count",
            points=[Point([datetime.now().timestamp(), download_count_pkg_float])],
            tags=["test:github"],
        )
    ]
)

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = MetricsApi(api_client)
    response1 = api_instance.submit_metrics(body=body_rpm)
    print("Github rpm metrics submission status: ",response1)
    response2 = api_instance.submit_metrics(body=body_deb)
    print("Github deb metrics submission status: ",response2)
    response3 = api_instance.submit_metrics(body=body_exe)
    print("Github exe metrics submission status: ",response3)
    response4 = api_instance.submit_metrics(body=body_pkg)
    print("Github pkg metrics submission status: ",response4)