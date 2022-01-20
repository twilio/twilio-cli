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

today = datetime.today()
yesterday = today - timedelta(days = 1)
yesterday_url_format= yesterday.strftime('%Y-%m-%d')
npm_url="https://api.npmjs.org/downloads/point/"+yesterday_url_format+"/twilio-cli"

response = requests.get(npm_url)
download_count=response.json()
download_count_float=float(download_count['downloads'])

body = MetricsPayload(
    series=[
        Series(
            metric="twilio_cli.npm_download.count",
            type="count",
            points=[Point([datetime.now().timestamp(), download_count_float])],
            tags=["test:npm"],
        )
    ]
)

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = MetricsApi(api_client)
    response = api_instance.submit_metrics(body=body)
    print("Metric value: ",download_count_float)
    print("NPM metrics submission status: ",response)